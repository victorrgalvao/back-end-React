// src/filmes/filme.entity.ts
import { User } from 'src/users/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';

@Entity()
export class Filme {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;
 
  @Column()
  imgUrl:string;
  // Defina outras colunas para o filme, como ano, diretor, etc.

  @ManyToMany(() => User, { cascade: true })
  @JoinTable()
  favoritos?: User[];
}
