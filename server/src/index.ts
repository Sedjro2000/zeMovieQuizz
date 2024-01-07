// index.ts

import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { buildSchema } from 'type-graphql';
import { QuestionResolver } from './resolvers';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());

createConnection()
  .then(async () => {
    const schema = await buildSchema({
      resolvers: [QuestionResolver],
    });

    const server = new ApolloServer({ schema });

    server.applyMiddleware({ app, path: '/graphql' });

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}/graphql`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });
