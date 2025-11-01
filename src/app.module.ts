import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ponto } from './ponto/ponto.entity';
import { Descarte } from './descarte/descarte.entity';
import { PontoModule } from './ponto/ponto.module';
import { DescarteModule } from './descarte/descarte.module';
import { RelatorioModule } from './relatorio/relatorio.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [Ponto, Descarte],
      synchronize: true, // Cria automaticamente o banco e tabelas
    }),
    PontoModule,
    DescarteModule,
    RelatorioModule,
  ],
})
export class AppModule {}
