import "reflect-metadata";
import express from "express";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";

import { openDBConnection } from "./utils/database";
import config from "./constants";
import { createSchema } from "./utils/createSchema";

// Connexion & 
const main = async () => {

  //Configuration de la Base de Données avec Retry
  let retries = Number(config.dbConnectionRetries);
  const retryTimeout = Number(config.timeoutBeforeRetry);

  while (retries) {
    try {
      const conn = await openDBConnection();
      await conn.synchronize();
      await conn.runMigrations();
      break;
    } catch (error) {
      retries -= 1;
      console.log(error);
      console.log(`retries left: ${retries}`);
      await new Promise((res) => setTimeout(res, retryTimeout));
    }
  }
  //Crée une instance du serveur Express 
  const app = express();

  //set up cors with express cors middleware
  app.use(
    cors({ origin: [config.frontend_url, config.studio_apollo_graphql_url] })
  );
  //Configuration d'Apollo Server :

  const apolloServer = new ApolloServer({
    schema: await createSchema(),
  });
  //Activation d'Apollo Server dans Express :

  await apolloServer.start();
  apolloServer.applyMiddleware({ app, cors: false });
  //Démarrage du Serveur Express 

  app.listen(config.port, () => {
    console.log(`server started on port ${config.port}`);
  });
};
//gestion des errors
main().catch((err) => {
  console.log(err);
});