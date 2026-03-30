import { Query, Resolver, Arg, Mutation } from "type-graphql";
import { Movie } from "../entities/Movie";
import { Actor } from "../entities/Actor"; 
import { MoviesResolver } from "./Movie";
import { ActorsResolver } from "./Actor";
import axios from "axios";
import constants from "../constants";

@Resolver()
export class TMDBResolvers {
  @Query(() => [Movie])
  async tmdbMovies(): Promise<Movie[]> {
    try {
      const tmdbApiUrl = "https://api.themoviedb.org/3/discover/movie";
      const apiKey = constants.tmdbApiKey;
      const response = await axios.get(tmdbApiUrl, {
        params: {
          api_key: apiKey,
        },
      });

      // Extract les films depuis la réponse de l'API TMDB
      const tmdbMovies: Movie[] = response.data.results.map((tmdbMovie: any) => ({
        title: tmdbMovie.title,
        id: tmdbMovie.id,
        overview: tmdbMovie.overview,
        releaseDate: tmdbMovie.release_date,
      }));

      return tmdbMovies || [];
    } catch (error) {
      console.error("Erreur lors de la récupération des films depuis TMDB :", error);
      return [];
    }
  }
  @Query(() => [Actor])
  async tmdbMovieActors(@Arg("movieId") movieId: string): Promise<Actor[]> {
    try {
      const tmdbApiUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits`;
      const apiKey = constants.tmdbApiKey;
      const response = await axios.get(tmdbApiUrl, {
        params: {
          api_key: apiKey,
        },
      });
  
      // Extract les acteurs depuis la réponse de l'API TMDB
      const tmdbActors: Actor[] = response.data.cast.map((tmdbActor: any) => {
        const actorName = tmdbActor.name;
  
        return { name: actorName };
      });
  
      return tmdbActors || [];
    } catch (error) {
      console.error("Erreur lors de la récupération des acteurs depuis TMDB :", error);
      return [];
    }
  }
  
  //envoi des datas recupérées depuis TMDB vers la BD 
  @Mutation(() => Promise<Boolean>)
  async syncTmdbMoviesToDatabase(): Promise<boolean> {
    try {
      const tmdbMovies = await this.tmdbMovies();

      for (const tmdbMovie of tmdbMovies) {
        const { title, overview, releaseDate, id } = tmdbMovie;
        const releaseDateValue: string = releaseDate || "";

        // Utilise le résolveur MoviesResolver actuel (this) pour créer un nouveau film dans la base de données locale
        await new MoviesResolver().createMovie(title, overview, releaseDateValue);

        // Utilise le résolveur ActorsResolver actuel (this) pour créer les acteurs du film dans la base de données locale
        await this.syncMovieActorsToDatabase(id.toString());
      }

      return true;
    } catch (error) {
      console.error("Erreur lors de la synchronisation des films avec la base de données :", error);
      return false;
    }
  }

  private async syncMovieActorsToDatabase(movieId: string): Promise<void> {
    try {
      const actors = await this.tmdbMovieActors(movieId);

      for (const actor of actors) {
        const { name } = actor;

        // Utilise le résolveur ActorsResolver actuel (this) pour créer un nouvel acteur dans la base de données locale
        await new ActorsResolver().createActor(name);
      }
    } catch (error) {
      console.error("Erreur lors de la synchronisation des acteurs avec la base de données :", error);
    }
  }
}