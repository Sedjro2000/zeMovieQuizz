import { ObjectType, Field, Int } from 'type-graphql';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Actor } from './Actor';

@ObjectType()
@Entity()
export class Movie extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column()
  title!: string;

  @Field(() => String)
  @Column()
  overview!: string;

  @Field(() => String)
  @Column({ nullable: true })
  releaseDate?: string;

  @Field(() => [Actor], { nullable: true })
  @ManyToMany(() => Actor, { cascade: true })
  @JoinTable()
  actors?: Actor[];
}
