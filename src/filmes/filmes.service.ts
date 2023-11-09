// src/filmes/filmes.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Filme } from './entities/filme.entity';
import { CreateFilmeDto } from './dto/create-filme.dto';

@Injectable()
export class FilmesService {
  constructor(
    @InjectRepository(Filme)
    private readonly filmeRepository: Repository<Filme>,
  ) { }

  async findAll(): Promise<Filme[]> {
    return this.filmeRepository.find();
  }

  async findById(id: number): Promise<Filme> {
    return this.filmeRepository.findOne({ where: { id: id } });
  }

  async create(dto: CreateFilmeDto): Promise<Filme> {
    const { titulo,imgUrl, favoritos } = dto;
    const filme = new Filme();
    filme.titulo = titulo;
    filme.imgUrl = imgUrl;
    // filme.favoritos = favoritos;
    return this.filmeRepository.save(filme);
  }
}
