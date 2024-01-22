import { Query, Resolver } from "type-graphql";
import { Question } from "../entities/Question";
import { getRandomMovieFromLocalDB, getRandomActorFromLocalDB, checkIfActorPlayedInMovie } from "../utils/questionUtils";

@Resolver()
export class QuestionResolver {

  @Query(() => Question)
  async generateQuestion(): Promise<Question> {
    try {
      const randomMovie = await getRandomMovieFromLocalDB();
      const randomActor = await getRandomActorFromLocalDB();

      // Créez une nouvelle instance de Question avec les données fournies
      const newQuestion = Question.create({
        movie: randomMovie,
        actor: randomActor,
        isCorrect: checkIfActorPlayedInMovie(randomMovie, randomActor),
      });

      // Sauvegardez la nouvelle instance dans la base de données (si nécessaire)
      await newQuestion.save();

      // Retournez la nouvelle instance créée
      return newQuestion;
    } catch (error) {
      console.error("Erreur lors de la génération de la question :", error);
      // Gestion de l'erreur selon vos besoins
      throw new Error("Erreur lors de la génération de la question");
    }
  }
}
