import { TAsyncResultTuple } from '../common/types';
import { DbPostgresConnection } from '../connections/db.postgres';
import { UrlUsageStatsEntity, IUrlUsageStats } from './entity';
import logger from '../utils/logger';

const urlUsageStatsRepository = DbPostgresConnection.getRepository(UrlUsageStatsEntity);

const insertOne = async (shortCode: string): TAsyncResultTuple<IUrlUsageStats> => {
    try {
        const number = 1;
        const statEntry = urlUsageStatsRepository.create({ number, shortCode });
        const statInserted = await urlUsageStatsRepository.save(statEntry);
        return [null, statInserted];
    } catch (error) {
        logger.logError('Error saving URL', error as Error, { shortCode });
        return [error, null];
    }
}

export default {
    insertOne
}