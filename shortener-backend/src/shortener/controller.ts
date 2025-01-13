import { Request, Response } from 'express';
import { getUniqueShortCode } from './shortcode.service';
import URLRepo from '../url/repository'
import StatsRepo from '../statistics/repository'
import { memoizeAsync } from '../utils/memoization';
import logger from '../utils/logger';
import { isUniqueConstranViolationError } from '../url/db';

const cacheTTL = 60 * 1000; //TODO: move to env variable
const cachedFindOneBySlug = memoizeAsync(URLRepo.findOneByShortCode, cacheTTL); // INFO in real life scenarios, we would use a cache like Redis or Memcached

const getUrlBySlug = async (req: Request, res: Response) => {
    const { slug } = req.params;
    const [errorFindURL, foundURL] = await cachedFindOneBySlug(slug);
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
        res.status(200).json({
            message: 'URL shortened',
            data: { slug: existingURL.shortCode }
        });
        return;
    }

    //TODO: make this more elegant (Think about recursion, or just limit execution times)
    let shortCode = getUniqueShortCode();
    const [errorSaveURL] = await URLRepo.saveUrl({ originalUrl: url, userId: null, shortCode });
    if (isUniqueConstranViolationError(errorSaveURL)) {
        logger.logError('Error saving URL', errorSaveURL as Error, { urlInfo: { originalUrl: url, shortCode } });
        let tryAgain = true;
        while (tryAgain) {
            shortCode = getUniqueShortCode();
            const [errorSaveURL] = await URLRepo.saveUrl({ originalUrl: url, userId: null, shortCode });
            if (!isUniqueConstranViolationError(errorSaveURL)) {
                tryAgain = false;
            } else {
                logger.logError('Error saving URL', errorSaveURL as Error, { urlInfo: { originalUrl: url, shortCode } });
            }
        }
    }

    if (errorSaveURL) {
        res.status(500).json({ message: 'Error saving URL' });
        return;
    }

    if (!errorSaveURL) {
        res.status(200).json({
            message: 'URL shortened',
            data: { slug: shortCode }
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
        res.status(500).json({
            message: 'Error saving URL stat',
            errors: ['Error saving URL stats']
        });
        return;
    }

    res.status(201).json({ message: `usage info saved` });
}

export default {
    getUrlBySlug,
    shortenURL,
    saveStats
}