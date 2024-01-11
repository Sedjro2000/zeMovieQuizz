import { ObjectType, Field, Int } from 'type-graphql';
import { 
    BaseEntity, 
    Entity,
    PrimaryGeneratedColumn, 
    Column 
} from 'typeorm';

@ObjectType()
@Entity()
export class Movie extends BaseEntity {
    //propriétés de Movies
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column()
  title!: string;

  
}
