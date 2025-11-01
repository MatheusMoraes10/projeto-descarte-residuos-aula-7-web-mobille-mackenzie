import { Controller, Get, Post, Body } from '@nestjs/common';
import { PontoService } from './ponto.service';
import { Ponto } from './ponto.entity';

@Controller('pontos')
export class PontoController {
  constructor(private readonly pontoService: PontoService) {}

  @Post()
  create(@Body() data: Partial<Ponto>) {
    return this.pontoService.create(data);
  }

  @Get()
  findAll() {
    return this.pontoService.findAll();
  }
}
