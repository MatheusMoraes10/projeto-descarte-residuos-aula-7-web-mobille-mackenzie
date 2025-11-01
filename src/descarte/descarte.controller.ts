import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { DescarteService } from './descarte.service';
import { Descarte } from './descarte.entity';

@Controller('descartes')
export class DescarteController {
  constructor(private readonly descarteService: DescarteService) {}

  @Post()
  create(@Body() data: Partial<Descarte>) {
    return this.descarteService.create(data);
  }

  @Get()
  findAll(
    @Query('pontoId') pontoId?: number,
    @Query('tipoResiduo') tipoResiduo?: string,
    @Query('nomeUsuario') nomeUsuario?: string,
  ) {
    const filtros: any = {};
    if (pontoId) filtros.ponto = { id: Number(pontoId) };
    if (tipoResiduo) filtros.tipoResiduo = tipoResiduo;
    if (nomeUsuario) filtros.nomeUsuario = nomeUsuario;

    return this.descarteService.findAll(filtros);
  }
}
