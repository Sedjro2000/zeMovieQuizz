
/*import { Query, Resolver, Arg } from "type-graphql";
import { Question } from "../entities/Question";

@Resolver()
export class QuestionsResolver {
  @Query(() => [Question])
  async questions(): Promise<Question[]> {
    // Logique pour récupérer la liste des questions depuis la base de données
    const questions = await // ... ta logique pour récupérer les questions;
    return questions || [];
  }

  @Query(() => Question)
  async question(@Arg("id") id: string): Promise<Question | undefined> {
    // Logique pour récupérer les détails d'une question spécifique par ID
    const question = await // ... ta logique pour récupérer une question;
    return question;
  }
}
*/
