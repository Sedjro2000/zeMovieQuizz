
import { MoviesResolver } from "../resolvers/Movie";
import { ActorsResolver } from "../resolvers/Actor";
import { QuestionResolver } from "../resolvers/Question";
import { GraphQLSchema } from "graphql";
import { buildSchema } from "type-graphql";




export const createSchema = (): Promise<GraphQLSchema> =>
  buildSchema({
    resolvers: [MoviesResolver,ActorsResolver,QuestionResolver],
    validate: false,
  });