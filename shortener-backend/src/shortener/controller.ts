import { Request, Response } from 'express';
import { getShortenerService, base62SlugAlgorithm } from './shorter.service';
import URLRepo from '../url/repository'
import StatsRepo from '../statistics/repository'
import { memoizeAsync } from '../utils/memoization';

const urlShortenerService = getShortenerService(base62SlugAlgorithm);

// INFO in real life scenarios, we would use a cache like Redis or Memcached
const cacheTTL = 60 * 1000;
const cachedFindOneBySlug = memoizeAsync(URLRepo.findOneById, cacheTTL);

const getUrlBySlug = async (req: Request, res: Response) => {
    const { slug } = req.params;

    const urlId = urlShortenerService.slugToId(slug);

    const [errorFindURL, foundURL] = await cachedFindOneBySlug(urlId);
    if (errorFindURL) {
        res.status(500).json({ message: 'Error while finding URL', errors: ['Error while finding URL'] });
        return;
    }
    if (foundURL) {
        res.status(200).json({
            message: `Url found`,
            data: { url: foundURL.originalUrl }
        });
        return;
    }

    res.status(404).json({ message: `URL not found`, errors: ['URL not found'] });
}

const shortenURL = async (req: Request, res: Response) => {
    const { url } = req.body;

    const [errorExistingURL, existingURL] = await URLRepo.findByOriginalUrl(url);
    if (errorExistingURL) {
        res.status(500).json({
            message: 'Error checking existing URL'
        });
        return;
    }
    if (existingURL) {
        const slug = urlShortenerService.idToSlug(existingURL.id);
        res.status(200).json({
            message: 'URL shortened',
            data: { slug }
        });
        return;
    }

    const [errorSaveURL, savedURL] = await URLRepo.saveUrl({ originalUrl: url, userId: null });
    if (errorSaveURL) {
        res.status(500).json({ message: 'Error saving URL' });
        return;
    }

    if (savedURL) {
        const slug = urlShortenerService.idToSlug(savedURL.id);
        res.status(200).json({
            message: 'URL shortened',
            data: { slug }
        });
        return;
    }

    res.status(200).json({
        message: 'something went wrong',
        errors: ['URL not saved']
    });
}

const saveStats = async (req: Request, res: Response) => {
    const { slug } = req.params;
    const [error,] = await StatsRepo.insertOne(slug);

    if (error) {
        res.status(500).json({ message: 'Error saving URL stat', errors: ['Error saving URL stats'] });
        return
    }

    res.status(201).json({ message: `usage info saved` });
}

export default {
    getUrlBySlug,
    shortenURL,
    saveStats
}