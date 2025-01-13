import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { UrlEntity } from '../url/entity';

dotenv.config();

export const DbPostgresConnection = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_DATABASE_NAME || 'shortener_db',
    synchronize: process.env.DB_SYNCHRONIZE === 'true' || false,
    logging: process.env.NODE_ENV === 'development' || false,
    entities: [UrlEntity],
    migrations: [],
    subscribers: [],
});