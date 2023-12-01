import express, { Express }     from "express";
import dotenv                   from "dotenv";
import loaders                  from "./src/loaders";
import { ProductionController } from "./src/controllers/production.controller";

dotenv.config();

async function startServer() {
  const app: Express = express();
  const port = process.env.PORT;
  await loaders(app);

  ProductionController(app);

  app.listen(port, () => {
    console.log(`The server is running at http://localhost:${port}`);
  });
}


startServer();
