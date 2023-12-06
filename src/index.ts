import express, { Express } from "express";
import dotenv from "dotenv";
import loaders from "./loaders";
import { ProductionController } from "./controllers/production.controller";
import { UserController } from "./controllers/user.controller";
import { UserSocialNetworkController } from "./controllers/user-social-network.controller";
import { ImageController } from "./controllers/image.controller";

dotenv.config();

async function startServer() {
  const app: Express = express();
  const port = process.env.PORT;
  try {
    await loaders(app);
  } catch (e) {
    console.error(e);
  }

  ImageController(app);
  ProductionController(app);
  UserController(app);
  UserSocialNetworkController(app);

  app.listen(port, () => {
    console.log(`The server is running at http://localhost:${port}`);
  });
}

startServer();
