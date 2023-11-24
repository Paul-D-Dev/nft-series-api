import { Application } from "express";
import cors            from "cors";
import bodyParser      from "body-parser";

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
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  return app;
}
