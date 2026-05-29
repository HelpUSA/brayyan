# Brayyan — Status Atual

## Infraestrutura

| Componente | Status | URL |
|------------|--------|-----|
| Vercel (Frontend + API) | Online | https://brayyan.vercel.app |
| Domínio | Configurado | https://brayyan.helpusbr.com |
| Railway (Backend + PostgreSQL) | Offline | https://brayyan-production.up.railway.app |
| GitHub | Ativo | https://github.com/HelpUSA/brayyan |

## Funcionalidades Implementadas

| Funcionalidade | Status |
|----------------|--------|
| Landing page / Dashboard | Concluido |
| Sidebar com navegacao (7 secoes) | Concluido |
| Cards: Review Info, Data Summary, Members, Screening Progress | Concluido |
| Tela de Screening (lista de artigos + detalhes) | Concluido |
| Keywords include/exclude com contagens | Concluido |
| Estados vazios (Full Text, Data Extraction, Risk of Bias) | Concluido |
| API /api/health | Concluido |
| CSV Parser (services/csv_parser.py) | Concluido |
| CSV Bootstrap Loader (data/*.csv) | Concluido |
| Endpoint /api/articles | Concluido |
| Endpoint /api/upload/csv | Concluido |
| Design Rayyan-like dark theme | Concluido |

## Dados

| Arquivo | Registros |
|---------|-----------|
| data/auto_include.csv | 886 |
| data/auto_exclude.csv | 115 |
| data/consolidated_export.csv | 3.539 |

## Problemas Conhecidos

| Problema | Status |
|----------|--------|
| APIs retornando 500 no Vercel | Corrigindo |
| Railway offline (Application not found) | Aguardando railway up |
| write-text-file remove indentacao Python | Bug conhecido do Bridge |

## Equipe

- DeepSeek NexosAI (revisao, correcao, deploy)
- ChatGPT Projeto Geral (implementacao)
