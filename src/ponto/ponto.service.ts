import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ponto } from './ponto.entity';

@Injectable()
export class PontoService {
  constructor(
    @InjectRepository(Ponto)
    private pontoRepo: Repository<Ponto>,
  ) {}

  create(data: Partial<Ponto>) {
    const ponto = this.pontoRepo.create(data);
    return this.pontoRepo.save(ponto);
  }

  findAll() {
    return this.pontoRepo.find();
  }
}
