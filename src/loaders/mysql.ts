import mysql, { Pool } from 'mysql2';
import { DbHandler } from "../repositories/db.handler";

export default async (): Promise<Pool> => {
  const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    dateStrings: true
  });

  DbHandler.getInstance(pool);

  return pool;
}
