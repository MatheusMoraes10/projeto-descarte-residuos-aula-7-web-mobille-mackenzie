import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Descarte } from './descarte.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DescarteService {
  constructor(
    @InjectRepository(Descarte)
    private descarteRepo: Repository<Descarte>,
  ) {}

  create(descarte: Descarte) {
    return this.descarteRepo.save(descarte);
  }

  findAll(tipoResiduo?: string) {
    if (tipoResiduo) {
      return this.descarteRepo.find({ where: { tipoResiduo } });
    }
    return this.descarteRepo.find();
  }
}
