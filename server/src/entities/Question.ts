import { ObjectType, Field, Int } from 'type-graphql';
import { BaseEntity, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Movie } from './Movie';
import { Actor } from './Actor';

@ObjectType()
@Entity()
export class Question extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;
  //Ce décorateur indiquent que les propriétés décorées (actor et movie) seront exposées en tant que champs GraphQL avec les types Actor et Movie, respectivement.
  @Field(() => Actor)
  //Ce décorateur indiquent une relation many-to-one (plusieurs questions peuvent être liées à un acteur ou à un film, mais un acteur ou un film est associé à plusieurs questions).
  @ManyToOne(() => Actor)
  //spécifient les colonnes dans la table Question qui contiendront les clés étrangères vers les tables Actor et Movie, respectivement.
  @JoinColumn({ name: 'actorId' })
  actor!: Actor;

  @Field(() => Movie)
  @ManyToOne(() => Movie)
  @JoinColumn({ name: 'movieId' })
  movie!: Movie;

}
