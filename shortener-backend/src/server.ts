import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import urlShortenerRouter from './shortener/routes';
import logger from './utils/logger';
import { DbPostgresConnection } from './connections/db.postgres';
import cors from 'cors';
import { tokenBucketLimiterMiddleware } from './common/rate.limiting.middleware';
//TODO: if time allows, add type safety for env variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3008;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(tokenBucketLimiterMiddleware); // In real life scenarios, we would use express-rate-limit or Redis for rate limiting
app.use('/api/v1/shortener', urlShortenerRouter);
app.use((req: Request, res: Response) => {
    res.status(404).json({
        message: 'Not Found',
        errors: ['Not Found']
    });
});


DbPostgresConnection.initialize()
    .then((): void => {
        logger.logData('Database connected successfully');
        app.listen(PORT, (): void => {
            logger.logData(`Server is running at http://localhost:${PORT}`);
        });
    })
    .catch((error: Error): void => {
        logger.logError('Error connecting to the database', error);
    });