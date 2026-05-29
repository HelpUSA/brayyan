# Stack Tecnologica — Brayyan

## 1. Stack Principal

| Camada | Tecnologia | Versao | Justificativa |
|--------|-----------|--------|---------------|
| Frontend Framework | React | 18+ | Ecossistema maduro, componentizacao |
| Bundler | Vite | 5+ | Rapido, ESM nativo |
| Linguagem Frontend | TypeScript | 5+ | Type safety |
| CSS Framework | TailwindCSS | 3+ | Utility-first, produtivo |
| UI Components | shadcn/ui | Latest | Components acessiveis e customizaveis |
| Data Fetching | TanStack Query | 5+ | Cache, refetch, loading states |
| Routing | React Router | 6+ | SPA routing |
| Charts | Recharts | 2+ | Graficos declarativos em React |
| State Management | Zustand | 4+ | Leve, sem boilerplate |
| Forms | React Hook Form | 7+ | Performance, validacao |
| Validation | Zod | 3+ | Schema validation |
| Icons | Lucide React | Latest | Icones consistentes |

## 2. Backend Stack

| Camada | Tecnologia | Versao | Justificativa |
|--------|-----------|--------|---------------|
| Linguagem | Python | 3.12 | Familiaridade, ecossistema de dados |
| Framework API | FastAPI | 0.110+ | Performance, OpenAPI, async |
| ORM | SQLAlchemy | 2.0+ | ORM maduro, async support |
| Migrations | Alembic | 1.13+ | Schema migrations |
| CSV Processing | Pandas | 2.2+ | Processamento de dados tabulares |
| Validation | Pydantic | 2+ | Data validation integrado ao FastAPI |
| Auth | python-jose + bcrypt | Latest | JWT + password hashing |
| Background Tasks | Celery + Redis | 5+ | Upload processing async |
| File Upload | python-multipart | Latest | Upload de arquivos |

## 3. Infraestrutura

| Componente | Provedor | Plano |
|------------|----------|-------|
| Frontend Hosting | Vercel | Free/Hobby ( 0 − 0−20/mes) |
| Backend Hosting | Railway | Starter (5/mes) |
| Database | Railway PostgreSQL | Incluso no Starter |
| Redis | Railway / Upstash | Free tier |
| Domain DNS | Cloudflare | Free |
| Source Control | GitHub | Free |
| CI/CD | GitHub Actions | Free |
| Monitoring | Sentry | Free tier |
| Analytics | Plausible | Self-hosted ou free tier |

## 4. Custo Mensal Estimado (MVP)

| Servico | Custo |
|---------|-------|
| Vercel | 0 (Hobby) |
| Railway | 5 (Starter) |
| Domain | 12/ano (~1/mes) |
| Sentry | 0 (Free) |
| Total | ~$6/mes |

## 5. Decisoes Tecnicas

### Por que FastAPI e nao Node.js?
- Python ja e usado no pipeline atual do CardioReview
- Pandas e essencial para parsing de CSV
- Tipagem com Pydantic reduz bugs
- Documentacao OpenAPI automatica

### Por que Vercel para frontend?
- Deploy automatico com Git
- CDN global
- Preview deployments
- Suporte a SPA e API routes

### Por que Railway para backend?
- PostgreSQL integrado
- Deploy simples via Git
- Escalabilidade
- Variaveis de ambiente faceis de configurar

### Por que shadcn/ui?
- Componentes acessiveis (Radix UI)
- Customizaveis com Tailwind
- Nao e uma dependencia npm, e codigo fonte copiado
- Visual profissional
