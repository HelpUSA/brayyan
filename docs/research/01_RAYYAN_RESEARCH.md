# Pesquisa Completa Rayyan.ai

## 1. Visao Geral

Plataforma web para revisoes sistematicas, desenvolvida pelo Qatar Computing Research Institute (QCRI). Lancada em 2013. Mais de 1 milhao de usuarios, 180+ paises.

## 2. Estrutura de Telas

### Dashboard Principal (My Reviews)
- Cards de reviews com titulo, numero de referencias, colaboradores
- Barra de busca
- Botao New Review
- Ordenacao por data, nome, progresso

### Tela da Review (Workspace)
Sidebar esquerda com navegacao:
- Dashboard (visao geral)
- References (lista de artigos)
- Screening (triagem sequencial)
- Conflicts (conflitos entre revisores)
- Labels (sistema de etiquetas)
- Analytics (metricas e PRISMA)
- Settings (configuracoes)
- Collaborators (gestao de equipe)
- Import/Export

### Tela de Screening (Principal)
- Layout: artigo centralizado com abstract completo
- Botoes de acao fixos: Include, Maybe, Exclude, Skip
- Atalhos de teclado: 1=include, 2=maybe, 3=exclude
- Razao de exclusao (selecionavel ao clicar exclude)
- Blind mode: nao mostra decisoes de outros revisores
- Progresso: X de Y artigos triados
- Highlight de keywords
- Link externo para PubMed/DOI
- Historio de decisoes
- Undo da ultima decisao

### Tela de Conflitos
- Lista de artigos onde revisores discordaram
- Side-by-side: decisao do revisor A vs revisor B
- Rationale de cada revisor
- Campo para decisao final (resolucao)

### Tela de Analytics
- PRISMA Flow Diagram interativo
- Contagens por revisor
- Matriz de concordancia
- Cohens Kappa
- Tempo medio por artigo
- Distribuicao de labels

### Tela de Labels
- Criacao de labels customizadas
- Cores por label
- Categorias: include, exclude, maybe, custom
- Aplicacao em lote (bulk apply)
- Filtros por label

## 3. Funcionalidades Importantes

- Import: RIS, BibTeX, CSV, PubMed (NBIB), EndNote
- Deteccao de duplicatas automatica
- Colaboracao multi-usuario
- Blinding configuracel
- Export CSV, RIS, PRISMA
- Rayyan AI (sugestoes de include/exclude, pago)

## 4. Modelo de Negocio

- Free: 3 reviews, 1000 refs cada, 2 colaboradores
- Professional (25/mes): reviews ilimitados, 5000 refs, 5 colaboradores, Rayyan AI
- Teams (50/usuario/mes): 20000 refs, colaboradores ilimitados
- Enterprise: customizado, SSO, API

## 5. Diferencial do Brayyan

Rayyan = triagem manual por humanos
Brayyan = triagem ja feita por IAs, upload e auditoria
