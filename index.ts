import express, { Express }     from "express";
import dotenv                   from "dotenv";
import loaders                  from "./src/loaders";
import { CollectionController } from "./src/controllers/collection.controller";

dotenv.config();

async function startServer() {
  const app: Express = express();
  const port = process.env.PORT;
  await loaders(app);

  CollectionController(app);

  app.listen(port, () => {
    console.log(`The server is running at http://localhost:${port}`);
  });
}


startServer();
