import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Ponto } from './ponto.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PontoService {
  constructor(
    @InjectRepository(Ponto)
    private pontoRepo: Repository<Ponto>,
  ) {}

  create(ponto: Ponto) {
    return this.pontoRepo.save(ponto);
  }

  findAll() {
    return this.pontoRepo.find();
  }

  findOne(id: number) {
    return this.pontoRepo.findOne({ where: { id } });
  }
}
