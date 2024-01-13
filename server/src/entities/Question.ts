import { ObjectType, Field, Int,  } from 'type-graphql';
import { GraphQLBoolean } from 'graphql';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Movie } from './Movie';
import { Actor } from './Actor';

@ObjectType()
@Entity()
export class Question extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Movie)
  @Field(() => Movie)
  film!: Movie;

  @ManyToOne(() => Actor)
  @Field(() => Actor)
  actor!: Actor;

  @Field(() => GraphQLBoolean)
  @Column()
  isCorrect!: boolean;

  
}
