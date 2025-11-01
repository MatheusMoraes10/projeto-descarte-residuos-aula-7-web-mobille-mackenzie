import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Descarte } from './descarte.entity';

@Injectable()
export class DescarteService {
  constructor(
    @InjectRepository(Descarte)
    private descarteRepo: Repository<Descarte>,
  ) {}

  create(data: Partial<Descarte>) {
    const descarte = this.descarteRepo.create(data);
    return this.descarteRepo.save(descarte);
  }

  findAll(filtros?: any) {
    return this.descarteRepo.find({ where: filtros });
  }
}
