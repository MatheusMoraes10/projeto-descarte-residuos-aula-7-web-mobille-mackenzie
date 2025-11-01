import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Ponto } from '../ponto/ponto.entity';

@Entity()
export class Descarte {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nomeUsuario: string;

  @Column()
  tipoResiduo: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  data: Date;

  @ManyToOne(() => Ponto, (ponto) => ponto.descartes, { eager: true })
  ponto: Ponto;
}
