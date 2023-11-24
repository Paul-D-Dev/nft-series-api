import { Pool } from 'mysql';

export class DbHandler {

  static instance: DbHandler;
  private pool: Pool;

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
        console.error(err);
        connection.query(sql, args, (err, rows) => {
          connection.release();
          if (err) {
            console.error(err);
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
