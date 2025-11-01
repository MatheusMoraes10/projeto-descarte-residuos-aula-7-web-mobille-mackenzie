import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RelatorioService } from './relatorio.service';
import { RelatorioController } from './relatorio.controller';
import { Descarte } from '../descarte/descarte.entity';
import { Ponto } from '../ponto/ponto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Descarte, Ponto])],
  providers: [RelatorioService],
  controllers: [RelatorioController],
})
export class RelatorioModule {}
