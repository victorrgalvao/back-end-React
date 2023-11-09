// src/filmes/filmes.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Filme } from './entities/filme.entity';
import { FilmesController } from './filmes.controller';
import { FilmesService } from './filmes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Filme])],
  controllers: [FilmesController],
  providers: [FilmesService],
})
export class FilmesModule {}
