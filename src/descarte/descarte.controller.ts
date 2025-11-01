import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { DescarteService } from './descarte.service';
import { Descarte } from './descarte.entity';

@Controller('descartes')
export class DescarteController {
  constructor(private readonly descarteService: DescarteService) {}

  @Post()
  create(@Body() descarte: Descarte): Promise<Descarte> {
    return this.descarteService.create(descarte);
  }

  @Get()
  findAll(@Query('tipoResiduo') tipoResiduo?: string): Promise<Descarte[]> {
    return this.descarteService.findAll(tipoResiduo);
  }
}
