# Analise de Risco — Brayyan

## 1. Matriz de Risco

| ID | Risco | Probabilidade | Impacto | Severidade |
|----|-------|--------------|---------|------------|
| R01 | CSV com formato inconsistente das IAs | Alta | Alto | Critico |
| R02 | Performance com datasets grandes (10k+ artigos) | Media | Medio | Alto |
| R03 | Perda de dados por falta de backup | Baixa | Alto | Medio |
| R04 | Incompatibilidade de colunas entre watchers | Alta | Medio | Alto |
| R05 | Falha no calculo de metricas (Kappa, PRISMA) | Media | Alto | Alto |
| R06 | Ataque de seguranca (SQL injection, XSS) | Baixa | Alto | Medio |
| R07 | Exceder limites do plano gratuito (Vercel/Railway) | Media | Medio | Medio |
| R08 | Falta de adocao por pesquisadores | Media | Alto | Alto |
| R09 | Complexidade de upload para usuarios nao tecnicos | Alta | Medio | Alto |
| R10 | Sincronizacao entre frontend e backend | Baixa | Medio | Baixo |

## 2. Detalhamento dos Riscos

### R01 — CSV com formato inconsistente
Descricao: Cada IA (ChatGPT, DeepSeek, Claude) pode gerar CSVs com nomes de colunas diferentes.
Mitigacao:
- Schema de colunas esperado documentado
- Mapeamento automatico de colunas (fuzzy matching)
- Validacao no upload com mensagens claras de erro
- Template CSV para download

### R02 — Performance com datasets grandes
Descricao: 10.000+ artigos podem tornar a interface lenta.
Mitigacao:
- Paginacao (50 registros por pagina)
- Indices no banco de dados
- Virtualizacao de tabela (TanStack Virtual)
- Cache com React Query
- Processamento async para calculos pesados

### R03 — Perda de dados
Descricao: Falha no banco de dados pode resultar em perda de projetos.
Mitigacao:
- Railway faz backups automaticos do PostgreSQL
- Exportacao periodica (CSV) como backup adicional
- Documentacao de recovery

### R04 — Incompatibilidade de colunas entre watchers
Descricao: Watcher A e B podem ter colunas com nomes diferentes para o mesmo dado.
Mitigacao:
- Schema canonico de colunas
- Mapeamento configuracel por projeto
- Validacao de chaves estrangeiras (PMID/DOI)

### R05 — Falha no calculo de metricas
Descricao: Calculos de Cohens Kappa, PRISMA counts podem estar errados.
Mitigacao:
- Testes unitarios com dados conhecidos
- Validacao cruzada com calculo manual
- Documentacao das formulas usadas

### R06 — Ataque de seguranca
Descricao: SQL injection, XSS, CSRF.
Mitigacao:
- SQLAlchemy previne SQL injection
- React previne XSS por default
- CORS configurado
- Rate limiting
- Helmet.js headers de seguranca

### R07 — Limites de plano gratuito
Descricao: Vercel (100GB bandwidth, 1000 serverless exec/mes) ou Railway ($5 credit).
Mitigacao:
- Monitoramento de uso
- Otimizacao de assets estaticos
- Upgrade de plano quando necessario

### R08 — Falta de adocao
Descricao: Pesquisadores podem nao confiar em triagem 100% IA.
Mitigacao:
- Foco em transparencia (rationale, scores)
- Export compativel com PRISMA e ferramentas tradicionais
- Publicacao do metodo (paper do CardioReview como prova de conceito)
- Interface familiar (Rayyan-like)

### R09 — Complexidade de upload
Descricao: Usuarios podem nao saber preparar CSVs no formato correto.
Mitigacao:
- Template CSV para download
- Wizard de upload passo a passo
- Exemplos visuais
- Mensagens de erro amigaveis
- Suporte a drag-and-drop

### R10 — Sincronizacao frontend/backend
Descricao: Discrepancia entre o que o frontend mostra e o que o backend tem.
Mitigacao:
- React Query com invalidacao de cache
- WebSockets para atualizacoes em tempo real (fase 2)
- Testes E2E com Playwright
