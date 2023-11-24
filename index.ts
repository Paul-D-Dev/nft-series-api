import express, { Express } from "express";
import dotenv               from "dotenv";
import loaders              from "./src/loaders";

dotenv.config();

async function startServer() {
  const app: Express = express();
  const port = process.env.PORT;
  await loaders(app);

  app.listen(port, () => {
    console.log(`The server is running at http://localhost:${port}`);
  });
}


startServer();
