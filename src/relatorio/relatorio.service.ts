import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, MoreThan } from 'typeorm';
import { Descarte } from '../descarte/descarte.entity';
import { Ponto } from '../ponto/ponto.entity';

@Injectable()
export class RelatorioService {
  constructor(
    @InjectRepository(Descarte) private descarteRepo: Repository<Descarte>,
    @InjectRepository(Ponto) private pontoRepo: Repository<Ponto>,
  ) {}

  async gerarResumo() {
    const agora = new Date();
    const ultimoMes = new Date();
    ultimoMes.setMonth(agora.getMonth() - 1);
    const trintaDiasAtras = new Date();
    trintaDiasAtras.setDate(agora.getDate() - 30);

    const descartes = await this.descarteRepo.find();

    if (descartes.length === 0) {
      return { mensagem: 'Nenhum dado disponível ainda.' };
    }

    // -------------------------------
    // 🔹 Local com mais descartes
    // -------------------------------
    const contagemPorPonto: Record<number, number> = descartes.reduce(
      (acc, d) => {
        const id = d.ponto.id;
        acc[id] = (acc[id] || 0) + 1;
        return acc;
      },
      {} as Record<number, number>,
    );

    const pontoMaisArray = Object.entries(contagemPorPonto).sort(
      (a, b) => (b[1] as number) - (a[1] as number),
    );

    let pontoMaisNome = 'N/A';
    if (pontoMaisArray.length > 0) {
      const pontoMaisId = Number(pontoMaisArray[0][0]);
      const ponto = await this.pontoRepo.findOne({
        where: { id: pontoMaisId },
      });
      pontoMaisNome = ponto?.nome || 'N/A';
    }

    // -------------------------------
    // 🔹 Tipo de resíduo mais frequente
    // -------------------------------
    const contagemTipo: Record<string, number> = descartes.reduce(
      (acc, d) => {
        acc[d.tipoResiduo] = (acc[d.tipoResiduo] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    const tipoMaisArray = Object.entries(contagemTipo).sort(
      (a, b) => (b[1] as number) - (a[1] as number),
    );

    const tipoMais =
      tipoMaisArray.length > 0 ? tipoMaisArray[0][0] : 'N/A';

    // -------------------------------
    // 🔹 Média de descartes por dia (últimos 30 dias)
    // -------------------------------
    const ultimos30 = descartes.filter(
      (d) => new Date(d.data) >= trintaDiasAtras,
    );
    const mediaPorDia = ultimos30.length / 30;

    // -------------------------------
    // 🔹 Número total de usuários distintos
    // -------------------------------
    const totalUsuarios = new Set(descartes.map((d) => d.nomeUsuario)).size;

    // -------------------------------
    // 🔹 Total de pontos cadastrados
    // -------------------------------
    const totalPontos = await this.pontoRepo.count();

    // -------------------------------
    // 🔹 Crescimento ou redução no volume mensal
    // -------------------------------
    const totalMesAtual = await this.descarteRepo.count({
      where: { data: MoreThan(ultimoMes) },
    });

    const mesAnteriorInicio = new Date(
      ultimoMes.getFullYear(),
      ultimoMes.getMonth() - 1,
      1,
    );
    const totalMesAnterior = await this.descarteRepo.count({
      where: { data: Between(mesAnteriorInicio, ultimoMes) },
    });

    const variacao =
      totalMesAnterior === 0
        ? 100
        : ((totalMesAtual - totalMesAnterior) / totalMesAnterior) * 100;

    // -------------------------------
    // 🔹 Resultado final
    // -------------------------------
    return {
      pontoComMaisDescartes: pontoMaisNome,
      tipoResiduoMaisFrequente: tipoMais,
      mediaDescartesPorDiaUltimos30: mediaPorDia.toFixed(2),
      totalUsuarios,
      totalPontos,
      variacaoPercentualMensal: `${variacao.toFixed(2)}%`,
    };
  }
}
