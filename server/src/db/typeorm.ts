import { registerAs } from "@nestjs/config";
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from "typeorm";
import * as config from 'config';

dotenvConfig({ path: '.env' });
const dbConfig = config.get('db');
const dbConfigOptions = {
    type: process.env.DB_TYPE || dbConfig.type,
    host: process.env.DB_HOST || dbConfig.host,
    port: process.env.DB_PORT || dbConfig.port,
    username: process.env.DB_USERNAME || dbConfig.user,
    password: process.env.DB_PASSWORD || dbConfig.password,
    database: process.env.DB_DATABASE || dbConfig.database,
    entities: ["dist/**/*.entity{.ts,.js}"],
    migrations: ["dist/db/migrations/*{.ts,.js}"],
    autoLoadEntities: true,
    synchronize: process.env.DB_SYNCRONIZE || dbConfig.synchronize,
    logging: process.env.DB_LOGGING || dbConfig.logging,
    logger: process.env.DB_LOGGER || dbConfig.logger,
}

export default registerAs('typeorm', () => dbConfigOptions)
export const connectionSource = new DataSource(dbConfigOptions as DataSourceOptions);