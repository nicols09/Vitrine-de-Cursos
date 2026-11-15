//Parte da [R6]

const statTotal = document.getElementById('stat-total');
const statDisponiveis = document.getElementById('stat-disponiveis');
const statMedia = document.getElementById('stat-media');
const statMaior = document.getElementById('stat-maior');
 
 //[R1] Dados do catálogo

 const cursos = [
    {
    id: 1,
    nome: 'Gestão Financeira',
    categoria: 'Negócios',
    descricao: 'Aprenda a organizar finanças, controlar gastos mensais e planejar investimentos de longo prazo.',
    horas: 20,
    disponivel: true
  },
  {
    id: 2,
    nome: 'Marketing Digital e Gestão de Redes Sociais',
    categoria: 'Negócios',
    descricao: 'Estratégias de criação de conteúdo, tráfego pago e métricas de engajamento para marcas.',
    horas: 35,
    disponivel: true
  },
  {
    id: 3,
    nome: 'Excel Avançado para Análise Corporativa',
    categoria: 'Negócios',
    descricao: 'Domine fórmulas, tabelas dinâmicas e dashboards.',
    horas: 40,
    disponivel: false
  },
  {
    id: 4,
    nome: 'Inglês Instrumental e Conversação',
    categoria: 'Idiomas',
    descricao: 'Desenvolva vocabulário e fluência para reuniões, entrevistas e situações do cotidiano.',
    horas: 60,
    disponivel: true
  },
  {
    id: 5,
    nome: 'Espanhol Prático para Viagens e Negócios',
    categoria: 'Idiomas',
    descricao: 'Comunicação essencial para atendimento, turismo e leitura de textos profissionais.',
    horas: 45,
    disponivel: true
  },
  {
    id: 6,
    nome: 'Libras: Comunicação Básica e Inclusão',
    categoria: 'Idiomas',
    descricao: 'Alfabeto manual, saudações e diálogos do dia a dia.',
    horas: 30,
    disponivel: false
  },
  {
    id: 7,
    nome: 'Fotografia Digital e Edição no Lightroom',
    categoria: 'Criatividade',
    descricao: 'Técnicas de iluminação, enquadramento, composição e tratamento profissional de imagens.',
    horas: 25,
    disponivel: true
  },
  {
    id: 8,
    nome: 'Oratória e Comunicação Assertiva',
    categoria: 'Design',
    descricao: 'Perca o medo de falar em público e estruture apresentações claras e persuasivas.',
    horas: 15,
    disponivel: true
  },
  {
    id: 9,
    nome: 'Design Gráfico e Identidade Visual',
    categoria: 'Design',
    descricao: 'Teoria das cores, tipografia e criação de logotipos.',
    horas: 50,
    disponivel: false
  },

  {
    id: 10,
    nome: 'Gestão de Projetos e Metodologias Ágeis',
    categoria: 'Design',
    descricao: 'Organize equipes, prazos e entregas utilizando Kanban, Scrum e planejamento estratégico.',
    horas: 30,
    disponivel: true
  },
  {
    id: 11,
    nome: 'Francês Básico para Comunicação e Cultura',
    categoria: 'Idiomas',
    descricao: 'Pronúncia, expressões cotidianas e compreensão auditiva.',
    horas: 40,
    disponivel: true
  },
  {
    id: 12,
    nome: 'Edição de Vídeo',
    categoria: 'Design',
    descricao: 'Cortes dinâmicos, trilha sonora, ritmo e narrativa visual para vídeos curtos e longos.',
    horas: 28,
    disponivel: false
  }
];

const catalogo = {
  nome: 'Vitrine de Cursos',
  itens: cursos,
  adicionar: function (item) {
    this.itens.push(item);
  },
  contarDisponiveis: function () {
    let total = 0;
    for (let i = 0; i < this.itens.length; i++) {
      if (this.itens[i].disponivel) {
        total++;
      }
    }
    return total;
  }
};

// [R2] Renderização dinâmica
const containerCursos = document.getElementById('lista-cursos');

function renderizar(lista) {
  containerCursos.innerHTML = '';

  if (lista.length === 0) {
    const aviso = document.createElement('p');
    aviso.className = 'mensagem-vazia';
    aviso.textContent = 'Nenhum item encontrado';
    containerCursos.appendChild(aviso);
    return;
  }

  for (let i = 0; i < lista.length; i++) {
    const curso = lista[i];

    const card = document.createElement('article');
    card.className = 'card-curso';

    let classeCategoria = '';
    let iconeCategoria = '';

    switch (curso.categoria) {
      case 'Negócios':
        classeCategoria = 'categoria-negocios';
        break;
      case 'Idiomas':
        classeCategoria = 'categoria-idiomas';
        break;
      case 'Design':
        classeCategoria = 'categoria-design';
        break;
      default:
        classeCategoria = 'categoria-padrao';
        break;
    }

    card.classList.add(classeCategoria);

    const badge = document.createElement('span');
    badge.className = 'badge-categoria';
    badge.textContent = curso.categoria;

    const titulo = document.createElement('h3');
    titulo.textContent = curso.nome;

    const descricao = document.createElement('p');
    descricao.className = 'descricao-curso';
    if (curso.descricao.length > 60) {
      descricao.textContent = curso.descricao.slice(0, 60) + '…';
    } else {
      descricao.textContent = curso.descricao;
    }

    const cargaHoraria = document.createElement('p');
    cargaHoraria.className = 'carga-horaria';
    cargaHoraria.textContent = 'Carga horária: ' + curso.horas.toFixed(0) + 'h';

    const status = document.createElement('p');
    status.className = 'status-curso';
    status.textContent = curso.disponivel ? 'Status: Matrículas abertas' : 'Status: Turma lotada';

    card.appendChild(badge);
    card.appendChild(titulo);
    card.appendChild(descricao);
    card.appendChild(cargaHoraria);
    card.appendChild(status);

    containerCursos.appendChild(card);
  }
}

renderizar(catalogo.itens);

// [R3] Busca e filtro
const campoBusca = document.getElementById('campo-busca');
const filtroCategoria = document.getElementById('filtro-categoria');

function filtrarCursos() {
  const termo = campoBusca.value.toLowerCase().trim();
  const categoriaSelecionada = filtroCategoria.value;
  const listaFiltrada = [];

  for (let i = 0; i < catalogo.itens.length; i++) {
    const curso = catalogo.itens[i];
    const nomeMinusculo = curso.nome.toLowerCase();
    const descricaoMinuscula = curso.descricao.toLowerCase();

    const bateTexto = nomeMinusculo.indexOf(termo) !== -1 || descricaoMinuscula.indexOf(termo) !== -1;

    const bateCategoria = categoriaSelecionada === 'Todas' || curso.categoria === categoriaSelecionada;

    if (bateTexto && bateCategoria) {
      listaFiltrada.push(curso);
    }
  }

  renderizar(listaFiltrada);

  if (typeof atualizarPainel === 'function') {
    atualizarPainel(listaFiltrada);
  }
}

campoBusca.addEventListener('input', filtrarCursos);

filtroCategoria.addEventListener('change', filtrarCursos);

campoBusca.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    campoBusca.value = '';
    filtroCategoria.value = 'Todas';
    filtrarCursos();
  }
});

// [R4] Formulário de cadastro com validação em JavaScript
const formCurso = document.getElementById('form-curso');
const inputNome = document.getElementById('input-nome');
const inputCategoria = document.getElementById('input-categoria');
const inputHoras = document.getElementById('input-horas');
const inputDescricao = document.getElementById('input-descricao');
const inputDisponivel = document.getElementById('input-disponivel');
const mensagemForm = document.getElementById('mensagem-form');

function limparErrosFormulario() {
  inputNome.classList.remove('campo-invalido');
  inputCategoria.classList.remove('campo-invalido');
  inputHoras.classList.remove('campo-invalido');
  inputDescricao.classList.remove('campo-invalido');
}

function validarCurso(dados) {
  limparErrosFormulario();

  if (dados.nome.length < 3) {
    inputNome.classList.add('campo-invalido');
    throw new Error('O nome do curso deve ter pelo menos 3 caracteres.');
  }

  if (dados.categoria === '') {
    inputCategoria.classList.add('campo-invalido');
    throw new Error('Selecione uma categoria válida para o curso.');
  }

  if (isNaN(dados.horas) || dados.horas <= 0 || dados.horas > 500) {
    inputHoras.classList.add('campo-invalido');
    throw new Error('A carga horária deve ser um número entre 1 e 500 horas.');
  }

  if (dados.descricao.length < 5) {
    inputDescricao.classList.add('campo-invalido');
    throw new Error('Informe uma descrição com pelo menos 5 caracteres.');
  }
}

formCurso.addEventListener('submit', function (event) {
  event.preventDefault();

  const dados = {
    nome: inputNome.value.trim(),
    categoria: inputCategoria.value,
    horas: parseFloat(inputHoras.value),
    descricao: inputDescricao.value.trim(),
    disponivel: inputDisponivel.checked
  };

  try {
    validarCurso(dados);

    const novoId = catalogo.itens.length > 0 ? catalogo.itens[catalogo.itens.length - 1].id + 1 : 1;

    const novoCurso = {
      id: novoId,
      nome: dados.nome,
      categoria: dados.categoria,
      descricao: dados.descricao,
      horas: dados.horas,
      disponivel: dados.disponivel
    };

    catalogo.adicionar(novoCurso);

    formCurso.reset();
    limparErrosFormulario();
    mensagemForm.textContent = 'Curso cadastrado com sucesso!';
    mensagemForm.className = 'mensagem-sucesso';

    filtrarCursos();
  } catch (erro) {
    mensagemForm.textContent = erro.message;
    mensagemForm.className = 'mensagem-erro';
  }
});

    const statusCurso = document.createElement('p');
    statusCurso.className = 'status-curso';
    statusCurso.textContent = curso.disponivel ? 'Status: Matrículas abertas' : 'Status: Turma lotada';

    if (!curso.disponivel) {
      card.classList.add('curso-indisponivel');
    }

    // [R5] Interação nos cards
    const botaoStatus = document.createElement('button');
    botaoStatus.type = 'button';
    botaoStatus.className = 'botao-status';
    botaoStatus.textContent = curso.disponivel ? 'Encerrar matrículas' : 'Abrir matrículas';

    botaoStatus.addEventListener('click', function () {
      curso.disponivel = !curso.disponivel;

      card.classList.toggle('curso-indisponivel');

      botaoStatus.textContent = curso.disponivel ? 'Encerrar matrículas' : 'Abrir matrículas';
      statusCurso.textContent = curso.disponivel ? 'Status: Matrículas abertas' : 'Status: Turma lotada';

      if (typeof atualizarPainel === 'function') {
        atualizarPainel(lista);
      }
    });

    card.appendChild(badge);
    card.appendChild(titulo);
    card.appendChild(descricao);
    card.appendChild(cargaHoraria);
    card.appendChild(statusCurso);
    card.appendChild(botaoStatus);

    containerCursos.appendChild(card);

    // [R6] Painel de estatísticas
function atualizarPainel(lista) {

  if (lista.length === 0) {
    statTotal.textContent = '—';
    statDisponiveis.textContent = '—';
    statMedia.textContent = '—';
    statMaior.textContent = '—';
    return;
  }

  let totalDisponiveis = 0;
  let somaHoras = 0;
  let cursoMaiorCarga = lista[0];

  for (let i = 0; i < lista.length; i++) {
    const curso = lista[i];

    if (curso.disponivel) {
      totalDisponiveis++;
    }

    somaHoras += curso.horas;

    if (curso.horas > cursoMaiorCarga.horas) {
      cursoMaiorCarga = curso;
    }
  }

  const mediaHoras = (somaHoras / lista.length).toFixed(2).replace('.', ',');

  statTotal.textContent = lista.length;
  statDisponiveis.textContent = totalDisponiveis;
  statMedia.textContent = mediaHoras + 'h';
  statMaior.textContent = cursoMaiorCarga.nome + ' (' + cursoMaiorCarga.horas + 'h)';
}

atualizarPainel(catalogo.itens);

// [R7] Qualidade, organização e inicialização do catálogo
function iniciarAplicacao() {
  const tituloPrincipal = document.getElementById('titulo-catalogo');
  if (tituloPrincipal) {
    tituloPrincipal.textContent = catalogo.nome;
  }

  renderizar(catalogo.itens);
  atualizarPainel(catalogo.itens);
}

iniciarAplicacao();