import { Controller, Get, Post, Body, Param, NotFoundException } from '@nestjs/common';
import { PontoService } from './ponto.service';
import { Ponto } from './ponto.entity';

@Controller('pontos')
export class PontoController {
  constructor(private readonly pontoService: PontoService) {}

  @Post()
  create(@Body() ponto: Ponto): Promise<Ponto> {
    return this.pontoService.create(ponto);
  }

  @Get()
  findAll(): Promise<Ponto[]> {
    return this.pontoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Ponto> {
    const ponto = await this.pontoService.findOne(Number(id));
    if (!ponto) {
      throw new NotFoundException(`Ponto com id ${id} não encontrado`);
    }
    return ponto;
  }
}
