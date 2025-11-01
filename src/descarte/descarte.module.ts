import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Descarte } from './descarte.entity';
import { DescarteService } from './descarte.service';
import { DescarteController } from './descarte.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Descarte])],
  providers: [DescarteService],
  controllers: [DescarteController],
  exports: [DescarteService],
})
export class DescarteModule {}
