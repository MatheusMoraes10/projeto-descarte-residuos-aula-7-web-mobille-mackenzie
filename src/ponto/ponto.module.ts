import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ponto } from './ponto.entity';
import { PontoService } from './ponto.service';
import { PontoController } from './ponto.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Ponto])],
  providers: [PontoService],
  controllers: [PontoController],
  exports: [PontoService],
})
export class PontoModule {}
