# projeto-descarte-residuos-aula-7-web-mobille-mackenzie
# Teste postman ou insomnia http://localhost:3000/

---

## 🧩 Descrição do Projeto

Este projeto faz parte do **componente extensionista da disciplina de Web Mobile** do Mackenzie.  
O objetivo é desenvolver uma **API NestJS com SQLite** para registrar e consultar **dados sobre o descarte de resíduos** em uma determinada localidade, promovendo conscientização ambiental e alinhando-se ao **ODS 12 da ONU: Consumo e Produção Responsáveis**.

---

## 🎯 Objetivos

- Cadastrar pontos de descarte (locais públicos/privados);
- Registrar descartes de resíduos por usuários;
- Consultar histórico filtrado de descartes;
- Gerar relatórios e estatísticas ambientais.

---

## ⚙️ Tecnologias Utilizadas

- [NestJS](https://nestjs.com/)
- [TypeORM](https://typeorm.io/)
- [SQLite](https://www.sqlite.org/)
- Node.js
- npm

---

## 🚀 Como rodar o projeto

### 1️⃣ Clonar o repositório

```bash
git clone https://github.com/seuusuario/projeto-descarte-residuos-aula-7-web-mobille-mackenzie.git
cd projeto-descarte-residuos-aula-7-web-mobille-mackenzie

- 2️⃣ Instalar as dependências
      - npm install
- 3️⃣ Rodar o servidor
      - npm run start
- A API ficará disponível em: http://localhost:3000

---

## 🧱 Estrutura das Entidades

### 🗺️ Ponto de Descarte (`ponto.entity.ts`)

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | number | Identificador do ponto |
| nome | string | Nome do local |
| bairro | string | Bairro onde se encontra |
| tipoLocal | string | Tipo do local (`público` / `privado`) |
| categoriasAceitas | string[] | Tipos de resíduos aceitos |
| latitude | number | Coordenada geográfica |
| longitude | number | Coordenada geográfica |

---

### 🧍 Registro de Descarte (`descarte.entity.ts`)

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | number | Identificador do descarte |
| nomeUsuario | string | Nome do usuário |
| tipoResiduo | string | Tipo do resíduo (plástico, papel, vidro, etc.) |
| data | Date | Data do descarte |
| ponto | Ponto | Referência ao ponto de descarte |

---

## 📊 Relatório (`/relatorio`)

A rota `/relatorio` retorna um resumo estatístico com:

- Local de descarte com mais registros;
- Tipo de resíduo mais frequente;
- Média de descartes por dia (últimos 30 dias);
- Total de usuários cadastrados;
- Total de pontos de descarte;
- Percentual de crescimento/redução no volume de descartes comparado ao mês anterior.

---

## 🧪 Testes no Postman / Insomnia

Use o **Postman** ou **Insomnia** para testar os endpoints.

### 🔹 Cadastro de Ponto de Descarte

**POST** `/pontos`

```json
{
  "nome": "Ecoponto Central",
  "bairro": "Centro",
  "tipoLocal": "público",
  "categoriasAceitas": ["plástico", "vidro"],
  "latitude": -23.5,
  "longitude": -46.6
}

---

## 💾 Banco de Dados (SQLite)

- O projeto utiliza **SQLite** como banco de dados local.
- Configuração em `app.module.ts` via **TypeORM**:

```typescript
TypeOrmModule.forRoot({
  type: 'sqlite',
  database: 'db.sqlite',
  entities: [Ponto, Descarte],
  synchronize: true,
})

## 🧪 Testes no Postman / Insomnia

| Método | Rota         | Exemplo de corpo (JSON) |
|--------|--------------|-------------------------|
| POST   | /pontos      | `{ "nome": "Ecoponto Central", "bairro": "Centro", "tipoLocal": "público", "categoriasAceitas": ["plástico","vidro"], "latitude": -23.5, "longitude": -46.6 }` |
| GET    | /pontos      | — |
| POST   | /descartes   | `{ "nomeUsuario": "João", "tipoResiduo": "plástico", "ponto": { "id": 1 } }` |
| GET    | /descartes   | `/descartes?tipoResiduo=plástico` |
| GET    | /relatorio   | — retorna resumo JSON |
