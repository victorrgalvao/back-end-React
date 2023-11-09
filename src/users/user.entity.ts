// src/users/user.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Filme } from 'src/filmes/entities/filme.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @ManyToMany(() => Filme, (filme) => filme.favoritos)
  @JoinTable()
  filmesFavoritos?: Filme[];
}
