// Question.ts
import { ObjectType, Field, Int } from 'type-graphql';
import { BaseEntity, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Movie } from './Movie';
import { Actor } from './Actor';

@ObjectType()
@Entity()
export class Question extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Movie, { eager: true })
  @Field(() => Movie)
  movie!: Movie;

  @ManyToOne(() => Actor, { eager: true })
  @Field(() => Actor)
  actor!: Actor;

  @Field(() => Boolean)
  isCorrect!: boolean;
}
