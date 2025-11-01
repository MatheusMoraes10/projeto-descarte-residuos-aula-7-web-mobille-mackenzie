const API = 'http://localhost:3000';

// --- Pontos ---
const formPonto = document.getElementById('formPonto');
const listaPontos = document.getElementById('listaPontos');
const selectPontos = document.getElementById('selectPontos');

async function carregarPontos() {
  const res = await fetch(`${API}/pontos`);
  const pontos = await res.json();
  listaPontos.innerHTML = '';
  selectPontos.innerHTML = '';
  pontos.forEach(p => {
    const li = document.createElement('li');
    li.textContent = `${p.id} - ${p.nome} (${p.tipoLocal})`;
    listaPontos.appendChild(li);

    const option = document.createElement('option');
    option.value = p.id;
    option.textContent = p.nome;
    selectPontos.appendChild(option);
  });
}

formPonto.addEventListener('submit', async e => {
  e.preventDefault();
  const data = {
    nome: e.target.nome.value,
    bairro: e.target.bairro.value,
    tipoLocal: e.target.tipoLocal.value,
    categoriasAceitas: e.target.categoriasAceitas.value.split(',').map(s => s.trim()),
    latitude: parseFloat(e.target.latitude.value),
    longitude: parseFloat(e.target.longitude.value),
  };
  await fetch(`${API}/pontos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  e.target.reset();
  carregarPontos();
});

carregarPontos();

// --- Descartes ---
const formDescarte = document.getElementById('formDescarte');
const listaDescartes = document.getElementById('listaDescartes');

async function carregarDescartes() {
  const res = await fetch(`${API}/descartes`);
  const descartes = await res.json();
  listaDescartes.innerHTML = '';
  descartes.forEach(d => {
    const li = document.createElement('li');
    li.textContent = `${d.nomeUsuario} descartou ${d.tipoResiduo} no ponto ${d.ponto.id}`;
    listaDescartes.appendChild(li);
  });
}

formDescarte.addEventListener('submit', async e => {
  e.preventDefault();
  const data = {
    nomeUsuario: e.target.nomeUsuario.value,
    tipoResiduo: e.target.tipoResiduo.value,
    ponto: { id: Number(e.target.pontoId.value) }
  };
  await fetch(`${API}/descartes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  e.target.reset();
  carregarDescartes();
});

carregarDescartes();

// --- Relatório ---
const btnRelatorio = document.getElementById('btnRelatorio');
const relatorioEl = document.getElementById('relatorio');

btnRelatorio.addEventListener('click', async () => {
  const res = await fetch(`${API}/relatorio`);
  const data = await res.json();
  relatorioEl.textContent = JSON.stringify(data, null, 2);
});
