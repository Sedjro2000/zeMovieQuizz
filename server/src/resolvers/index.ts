import { Query, Resolver } from 'type-graphql';
import { QuestionEntity } from '../entities/QuestionEntity';

@Resolver()
export class QuestionResolver {
  @Query(() => QuestionEntity)
  async getQuestion(): Promise<QuestionEntity> {
    // Implémenter la logique pour obtenir une question depuis la base de données
    // (utiliser TypeORM pour interroger la base de données)

    // Pour l'instant, retourne une question statique
    return {
      id: 1,
      actor: 'Tom Hanks',
      moviePoster: 'https://example.com/movie-poster.jpg',
      answer: true,
    };
  }
}
