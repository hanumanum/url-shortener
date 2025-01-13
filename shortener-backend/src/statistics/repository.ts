import { TAsyncResultTuple } from '../common/types';
import { DbPostgresConnection } from '../connections/db.postgres';
import { UrlUsageStatsEntity, IUrlUsageStats } from './entity';
import logger from '../utils/logger';

const urlUsageStatsRepository = DbPostgresConnection.getRepository(UrlUsageStatsEntity);

const insertOne = async (shortCode: string): TAsyncResultTuple<IUrlUsageStats> => {
    try {
        const number = 1;
        // We are inserting a URL usage stats entry with a number of 1
        // by using the shortCode and SQL aggregations, we can insert aggerated (SUMed) values as one row periodically, by cron job
        // IDEA STEPS:  
        // --------- St 1 ---------
        // SELECT SUM(number) as total_clicks, shortCode
        // FROM url_usage_stats
        // WHERE createdAt >= '2021-01-01' AND createdAt <= '2021-01-31' 
        // GROUP BY shortCode;
        // --------- St 2 --------- 
        // DELETE all rows where createdAt >= '2021-01-01' AND createdAt <= '2021-01-31'
        // --------- St 3 ---------
        // INSERT aggregated values from St1.
        
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