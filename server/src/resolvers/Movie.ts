import { Query, Resolver, Arg, Mutation } from "type-graphql";
import { Movie } from "../entities/Movie";

@Resolver()
export class MoviesResolver {

  @Mutation(() => Movie)
  async createMovie(
    @Arg("title") title: string,
    @Arg("overview") overview: string,
    @Arg("releaseDate") releaseDate: string
  ): Promise<Movie | undefined> {
    try {
      // Création une nouvelle instance de Movie avec les données fournies
      const newMovie = Movie.create({ title, overview, releaseDate });
  
      // Sauvegarde de  la nouvelle instance dans la base de données
      await newMovie.save();
  
      // Retour de  la nouvelle instance créée
      return newMovie;
    } catch (error) {
      console.error("Erreur lors de la création d'un nouveau film :", error);
      return undefined;
    }
  }
  
  @Query(() => [Movie])
  async movies(): Promise<Movie[]> {
    try {
      // Récupération de la liste des films depuis la base de données avec les acteurs associés
      const movies = await Movie.find({ relations: ['actors'] });
      return movies || [];
    } catch (error) {
      console.error("Erreur lors de la récupération de la liste des films :", error);
      return [];
    }
  }

  @Query(() => Movie)
  async movie(@Arg("id") id: string): Promise<Movie | undefined> {
    try {
      // Récupération les détails d'un film spécifique par ID depuis la base de données
      const movie = await Movie.findOne({ where: { id }, relations: ['actors'] });
      return movie
    } catch (error) {
      console.error("Erreur lors de la récupération des détails du film :", error);
      return undefined;
    }
  }
}
