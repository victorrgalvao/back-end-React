// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/createUserDto.dto';
import { ResultadoDto } from './dto/resultadoDto.dto';
import { Filme } from 'src/filmes/entities/filme.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  async create(user: CreateUserDto): Promise<ResultadoDto> {
    let usuario = new User();
    usuario.username = user.username;
    usuario.password = user.password;
    return this.usersRepository.save(usuario)
      .then((result) => {
        return <ResultadoDto>{
          status: true,
          mensagem: 'usuario cadastrado'
          ,user
        }
      }).catch((error) => {
        return <ResultadoDto>{
          status: false,
          mensagem: 'usuario nao cadastrado'
        }
      })

  }

  async getAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async getUserWithFavoriteFilms(username: string): Promise<User> {
    return this.usersRepository.findOne({
      where: { username: username },
      relations: ['filmesFavoritos']
    });
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { username } });
  }
  async save(user: User): Promise<User> {
    return this.usersRepository.save(user);
  }
  async addFilmeToFavoritos(userId: number, filme: Filme): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['filmesFavoritos']
    });
    console.log(user)
    user.filmesFavoritos.push(filme);
    return this.usersRepository.save(user);
  }
}
