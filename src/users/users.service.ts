// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/createUserDto.dto';
import { ResultadoDto } from './dto/resultadoDto.dto';

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

  async findOne(username: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { username } });
  }
}
