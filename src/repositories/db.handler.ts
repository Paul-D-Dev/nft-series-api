import { Pool } from 'mysql2';

export class DbHandler {

  static instance: DbHandler;
  private readonly pool: Pool;

  static getInstance(pool?: Pool) {
    if (!this.instance && pool != null) {
      this.instance = new DbHandler(pool);
    }
    return this.instance;
  }

  private constructor(pool: Pool) {
    this.pool = pool;
  }

  query(sql: string, args?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.pool.getConnection((err, connection) => {
        if (err) {
          console.error('getConnection error: ', err);
          return reject(err);
        }
        connection.query(sql, args, (err, rows) => {
          connection.release();
          if (err) {
            console.error('query error: ', err);
            return reject(err);
          }
          resolve(rows);
        });
      });
    });
  }

  close(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.pool.end(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  }

}
