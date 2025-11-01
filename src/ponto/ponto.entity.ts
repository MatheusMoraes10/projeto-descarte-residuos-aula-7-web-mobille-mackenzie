import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Descarte } from '../descarte/descarte.entity';

@Entity()
export class Ponto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  bairro: string;

  @Column()
  tipoLocal: string; // público / privado

  @Column('simple-array')
  categoriasAceitas: string[];

  @Column('float')
  latitude: number;

  @Column('float')
  longitude: number;

  @OneToMany(() => Descarte, (descarte) => descarte.ponto)
  descartes: Descarte[];
}
