import express, { Application } from "express";
import cors                     from "cors";

export default async (app: Application) => {
  app.get('/', (req, res) => {
    res.status(200).end();
  });
  app.get('/status', (req, res) => {
    res.status(200).end();
  });
  app.head('/status', (req, res) => {
    res.status(200).end();
  });

  app.use(cors());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  return app;
}
