
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';

@Entity()
@ObjectType()
export class QuestionEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column()
  @Field()
  actor: string;

  @Column()
  @Field()
  moviePoster: string;

  @Column()
  @Field()
  answer: boolean;
}
