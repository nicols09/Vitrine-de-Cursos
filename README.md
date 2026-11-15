Projeto de JavaScript — Catálogo Interativo (Vitrine de Cursos)

1. Identificação da Dupla e Tema
Integrante 1: Nícolas dos Anjos Gabriel 
Integrante 2: Mateus dos Santos Felippe de Oliveira

2. Mapeamento dos Requisitos no Código (js/app.js)
- Questão 01 [R1] Dados do catálogo: Array const cursos com 12 objetos literais divididos em 3 categorias (Negócios, Idiomas e Design) e objeto gerenciador const catalogo com os métodos adicionar(item) e contarDisponiveis() usando this.
- Questão 02 [R2] Renderização dinâmica: Função renderizar(lista), que limpa o contêiner #lista-cursos, cria os cards com document.createElement e appendChild, trunca descrições acima de 60 caracteres com slice(0, 60) + "…", formata a carga horária com toFixed(1), aplica classes CSS por categoria via switch e exibe "Nenhum item encontrado" quando a lista está vazia.
- Questão 03 [R3] Busca e filtro: Função filtrarCursos() e eventos input (#campo-busca), change (#filtro-categoria) e keydown (tecla Escape para limpar a busca), fazendo filtragem combinada (&&) com laço for, toLowerCase(), indexOf() e push().
- Questão 04 [R4] Formulário de cadastro com validação: Funções limparErrosFormulario() e validarCurso(dados) com o evento submit do #form-curso (novalidate e event.preventDefault()), lançando erros com throw new Error(), tratando com try...catch, marcando campos inválidos com classList.add('campo-invalido') e cadastrando novos cursos com catalogo.adicionar().
- Questão 05 [R5] Interação nos cards: Evento click registrado no botão .botao-status dentro de renderizar(lista) para alternar o booleano curso.disponivel com !, alternar a classe .curso-indisponivel com classList.toggle() e atualizar o texto do card e o painel.
- Questão 06 [R6] Painel de estatísticas: Função atualizarPainel(lista), que calcula sobre os itens exibidos o total de cursos, total de matrículas abertas, média de carga horária com toFixed(2).replace('.', ',') e o curso de maior carga horária por comparação em laço for, exibindo "—" em caso de lista vazia para evitar NaN.
- Questão 07 [R7] Qualidade e organização: Função iniciarAplicacao() e código externo em js/app.js (carregado com defer), usando apenas let, const e addEventListener, sem métodos proibidos (map, filter, reduce, sort) ou eventos inline no HTML.

3. Divisão de Tarefas da Dupla
- Nícolas dos Anjos Gabriel: Estruturação do HTML5 semântico (index.html), implementação dos dados e métodos do objeto principal ([R1]), lógica de busca, filtro e eventos de teclado ([R3]), validação do formulário com try...catch ([R4]) e painel de estatísticas ([R6]).
- [Nome do(a) colega]: Estilização completa, layout responsivo em Grid/Flexbox e identidade visual das categorias (css/style.css), renderização dinâmica dos cards ([R2]), interação de alternância de disponibilidade nos cards ([R5]) e testes finais de console e responsividade ([R7]).

4. Dificuldades Encontradas e Soluções
1) Erro de ordem de inicialização das variáveis do painel (Cannot access 'statTotal' before initialization): Ao testar o cadastro de um novo curso no formulário, a atualização encadeada tentava acessar os elementos do DOM antes da declaração das constantes do painel no arquivo JavaScript. Solução: Reorganizamos a ordem das declarações no js/app.js para inicializar as referências do painel antes das funções de filtragem e cadastro.
2) Conflito de escopo com a variável status: Durante a criação dinâmica dos cards, o editor sinalizou a variável status como obsoleta por colidir com a propriedade global window.status do navegador. Solução: Renomeamos a variável local para statusCurso, eliminando o aviso e mantendo o código limpo.
3) Sincronização entre busca por texto, filtro por categoria e painel estatístico sem usar .filter() ou Math.max(): Garantir que o painel recalculasse os valores apenas sobre os itens visíveis sem usar os métodos proibidos exigiu atenção nos laços de repetição e no tratamento de listas vazias. Solução: Implementamos laços for tradicionais com acumuladores, comparações diretas e verificação if (lista.length === 0) para exibir "—" no lugar de NaN.

5. Declaração de Uso de Inteligência Artificial
- Ferramenta utilizada: Google Gemini.
- Finalidade: Apoio ao estudo e consulta durante o desenvolvimento do projeto — especificamente para revisar a estrutura semântica do HTML5, esclarecer o funcionamento de escopo e referência do this em objetos JavaScript, depurar o erro de ordem de inicialização no DOM e estruturar a documentação deste README.md. Todo o código foi compreendido, adaptado ao tema Vitrine de Cursos e testado pela dupla.
