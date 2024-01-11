import { GraphQLSchema } from "graphql";
import { buildSchema } from "type-graphql";



export const createSchema = (): Promise<GraphQLSchema> =>
  buildSchema({
    resolvers: [],
    validate: false,
  });