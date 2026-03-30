import { Movie } from "../entities/Movie";
import { Actor } from "../entities/Actor";
import { MoviesResolver } from "../resolvers/Movie";
import { ActorsResolver } from "../resolvers/Actor";

const checkIfActorPlayedInMovie = (movie: Movie, actor: Actor): boolean => {
    // Vérifie si la relation 'actors' est chargée
    if (!movie.actors) {
      throw new Error("La relation 'actors' du film n'est pas chargée.");
    }
  
    // Vérifie si l'acteur fait partie de la liste des acteurs du film
    return movie.actors.some((movieActor) => movieActor.id === actor.id);
  };

const getRandomMovieFromLocalDB = async (): Promise<Movie> => {
  try {
    const moviesResolver = new MoviesResolver();
    const movies = await moviesResolver.movies();
    const randomMovie = movies[Math.floor(Math.random() * movies.length)];
    return randomMovie;
  } catch (error) {
    console.error("Erreur lors de la récupération d'un film aléatoire :", error);
    return {} as Movie;
  }
};

const getRandomActorFromLocalDB = async (): Promise<Actor> => {
  try {
    const actorsResolver = new ActorsResolver();
    const actors = await actorsResolver.actors();
    const randomActor = actors[Math.floor(Math.random() * actors.length)];
    return randomActor;
  } catch (error) {
    console.error("Erreur lors de la récupération d'un acteur aléatoire :", error);
    return {} as Actor;
  }
}

export { getRandomMovieFromLocalDB, getRandomActorFromLocalDB, checkIfActorPlayedInMovie };
