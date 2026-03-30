import { InputType, Field } from 'type-graphql';

@InputType()
export class QuestionInput {
  @Field(() => String)
  actorId!: string;

  @Field(() => String)
  movieId!: string;

  /*@Field(() => Boolean)
  isSpecial!: boolean;*/

}


