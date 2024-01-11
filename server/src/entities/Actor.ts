import { ObjectType, Field, Int } from 'type-graphql';
import { 
  BaseEntity, 
  Entity, 
  PrimaryGeneratedColumn, 
  Column 
} from 'typeorm';

@ObjectType()
@Entity()
export class Actor extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column()
  name!: string;


}
