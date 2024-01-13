import { Query, Resolver, Arg, Mutation } from "type-graphql";
import { Actor } from "../entities/Actor";

@Resolver()
export class ActorsResolver {
  // Query pour récupérer la liste des acteurs depuis la base de données
  @Query(() => [Actor])
  async actors(): Promise<Actor[]> {
    try {
      // Logique pour récupérer la liste des acteurs depuis la base de données
      const actors = await Actor.find();
      return actors || [];
    } catch (error) {
      console.error("Erreur lors de la récupération de la liste des acteurs :", error);
      return [];
    }
  }

  // Query pour récupérer les détails d'un acteur spécifique par ID depuis la base de données
  @Query(() => Actor)
  async actor(@Arg("id") id: string): Promise<Actor | undefined> {
    try {
      // Logique pour récupérer les détails d'un acteur spécifique par ID depuis la base de données
      const actor = await Actor.findOne({ where: { id } });
      return actor;
    } catch (error) {
      console.error("Erreur lors de la récupération des détails de l'acteur :", error);
      return undefined;
    }
  }

  // Mutation pour créer un nouvel acteur dans la base de données
  @Mutation(() => Actor)
  async createActor(@Arg("name") name: string): Promise<Actor | undefined> {
    try {
      // Création d'une nouvelle instance de Actor avec les données fournies
      const newActor = Actor.create({ name });

      // Sauvegarde de  la nouvelle instance dans la base de données
      await newActor.save();

      // Retour de  la nouvelle instance créée
      return newActor;
    } catch (error) {
      console.error("Erreur lors de la création d'un nouvel acteur :", error);
      return undefined;
    }
  }
}
