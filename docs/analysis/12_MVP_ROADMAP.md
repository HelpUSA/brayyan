# Roadmap MVP — Brayyan

## Visao Geral

O MVP do Brayyan deve entregar o fluxo completo: upload dos CSVs das IAs ate a visualizacao de resultados e exportacao. O foco e no usuario do CardioReview como primeiro caso de uso.

## Fases

### Fase 0 — Setup (Dia 1)
- Inicializar repositorio Git
- Configurar Vercel (frontend)
- Configurar Railway (backend + PostgreSQL)
- Configurar dominio brayyan.helpusbr.com
- CI/CD basico com GitHub Actions

### Fase 1 — Core Backend (Dias 2-4)
- Schema do banco de dados (migrations)
- API de projetos (CRUD)
- API de upload de CSVs
- Parser de CSV (watcher_a, watcher_b, consensus)
- Importacao para o banco de dados
- Calculo de consenso e conflitos
- Endpoints de artigos com filtros

### Fase 2 — Core Frontend (Dias 5-8)
- Layout base (sidebar + header + main)
- Tela de login/registro
- Dashboard com lista de projetos
- Criacao de projeto
- Tela de upload (drag-and-drop)
- Tabela de artigos com filtros
- Visualizacao de detalhes do artigo

### Fase 3 — Screening View (Dias 9-11)
- Tela de screening sequencial (um artigo por vez)
- Botoes include/exclude/maybe (mock, pois decisoes ja vieram das IAs)
- Visualizacao de decisoes dos watchers
- Scores de confianca
- Racionales expandiveis

### Fase 4 — Conflitos e Metricas (Dias 12-14)
- Tela de conflitos (side-by-side)
- Resolucao de conflitos
- Dashboard de metricas
- PRISMA flow counts
- Grafico de concordancia
- Cohens Kappa

### Fase 5 — Export e Finalizacao (Dias 15-16)
- Export CSV consolidado
- Export PRISMA flow (PNG/SVG)
- Download de relatorio (PDF)
- Filtros avancados

### Fase 6 — Polimento (Dias 17-18)
- Loading states e skeletons
- Error handling
- Responsividade
- Testes basicos
- Documentacao de uso

### Fase 7 — Deploy e Validacao (Dias 19-20)
- Deploy em producao
- Teste com dados reais do CardioReview
- Ajustes finos
- README e docs

## Entregaveis por Fase

| Fase | Entregavel | Criterio de Aceite |
|------|-----------|-------------------|
| 0 | Repo + deploy vazio | Site no ar em brayyan.helpusbr.com |
| 1 | API funcional | CRUD projetos + upload CSV |
| 2 | Frontend basico | Login + upload + tabela |
| 3 | Screening view | Navegacao sequencial + decisoes visiveis |
| 4 | Conflitos + metricas | Graficos e Cohens Kappa |
| 5 | Export | Download CSV + PRISMA |
| 6 | Polimento | UX suave, sem erros visiveis |
| 7 | Producao | CardioReview importado com sucesso |

## Metodo de Trabalho

- Desenvolvimento incremental
- Cada fase entrega valor funcional
- Testes com dados reais do CardioReview desde a Fase 1
- Deploy continuo (cada merge na main vai para producao)
