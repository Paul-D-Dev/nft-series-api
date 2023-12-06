import { Application } from "express";
import expressLoader from './express';
import dbLoader from './mysql';

export default async (app: Application) => {
  try {
    await expressLoader(app);
    console.log('Express Initialized');
  } catch (e) {
    throw new Error(`Something wrong with init Express: ${e}`);
  }

  try {
    await dbLoader();
    console.log('Database Initialized');
  } catch (e) {
    throw new Error(`Something wrong with init DB: ${e}`);
  }
}
