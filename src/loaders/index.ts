import { Application } from "express";
import expressLoader   from './express';
import dbLoader        from './mysql';

export default async (app: Application) => {
  await expressLoader(app);
  console.log('Express Initialized');

  await dbLoader();
  console.log('Database Initialized');
}
