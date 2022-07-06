import 'dotenv/config';
import { Pool } from 'pg';

const test = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT)
};

let pool: Pool;

export const db = () => {
    console.info(test);
    if (!pool) {
        pool = new Pool(test);
    }
    console.info(pool)
    return pool;
}

