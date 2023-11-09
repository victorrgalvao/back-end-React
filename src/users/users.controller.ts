// src/users/users.controller.ts
import { Controller, Post, Body, Get,Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUserDto.dto';
import { ResultadoDto } from './dto/resultadoDto.dto';
import { User } from './user.entity';
import { Filme } from 'src/filmes/entities/filme.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() createUserDto:CreateUserDto): Promise<ResultadoDto> {
    return this.usersService.create(createUserDto);
   
   
  }
  @Get(':username')
  async getone(@Param('username')username:string): Promise<User>{
    return this.usersService.findOne(username);

  }
  @Get()
  async getAll(): Promise<User[]>{
    return this.usersService.getAll();

  }
  @Post(':userId/favoritos/:filmeId')
  async addFilmeToFavoritos(@Param('userId') userId: number, @Param('filmeId') filmeId: number): Promise<User> {
    const filme = new Filme();
    filme.id = filmeId; // Você pode criar um objeto Filme ou simplesmente definir o ID, dependendo de sua lógica

    return this.usersService.addFilmeToFavoritos(userId, filme);
  }
  @Get(':userId/filmes-favoritos')
  async getUserWithFavoriteFilms(@Param('username') username: string): Promise<User> {
    return this.usersService.getUserWithFavoriteFilms(username);
  }
}
