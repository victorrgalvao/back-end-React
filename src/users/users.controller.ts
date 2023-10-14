// src/users/users.controller.ts
import { Controller, Post, Body, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUserDto.dto';
import { ResultadoDto } from './dto/resultadoDto.dto';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() createUserDto:CreateUserDto): Promise<ResultadoDto> {
    return this.usersService.create(createUserDto);
   
   
  }
  @Get()
  async getAll(): Promise<User[]>{
    return this.usersService.getAll();

  }
}
