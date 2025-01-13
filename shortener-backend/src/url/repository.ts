import { TAsyncResultTuple } from '../common/types';
import { DbPostgresConnection } from '../connections/db.postgres';
import { UrlEntity, IUrl } from './entity';
import logger from '../utils/logger';

const urlRepository = DbPostgresConnection.getRepository(UrlEntity);

type TSaveUrl = {
    originalUrl: string,
    userId: number | null,
}

const saveUrl = async (urlInfo: TSaveUrl): TAsyncResultTuple<IUrl> => {
    try {
        const { originalUrl, userId } = urlInfo;
        const url = urlRepository.create({ originalUrl, userId });
        const newURL = await urlRepository.save(url);
        return [null, newURL];
    } catch (error) {
        logger.logError('Error saving URL', error as Error, { urlInfo });
        return [error, null];
    }
}

const findOneById = async (id: number): TAsyncResultTuple<IUrl> => {
    try {
        const url = await urlRepository.findOneBy({ id });
        return [null, url];
    }
    catch (error) {
        logger.logError('Error finding URL by ID', error as Error, { id });
        return [error, null]
    }
}

const findByOriginalUrl = async (originalUrl: string): TAsyncResultTuple<IUrl> => {
    try {
        const url = await urlRepository.findOneBy({ originalUrl });
        return [null, url];
    }
    catch (error) {
        logger.logError('Error finding URL by original URL', error as Error, { originalUrl });
        return [error, null];
    }
}

//TODO: add pagination
const findByUserId = async (userId: number): TAsyncResultTuple<IUrl[]> => {
    try{
        const urls = await urlRepository.find({ where: { userId } });
        return [null, urls];
    }
    catch (error) {
        logger.logError('Error finding URL by user ID', error as Error, { userId });
        return [error, null];
    }
}

export default {
    saveUrl,
    findOneById,
    findByOriginalUrl,
    findByUserId
}