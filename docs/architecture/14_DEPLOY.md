# Guia de Deploy — Brayyan

## Dominio

- URL Producao: https://brayyan.helpusbr.com
- Dominio raiz: helpusbr.com
- Subdominio: brayyan

## 1. Configuracao DNS (Cloudflare)


Tipo Nome Conteudo TTL Proxy
CNAME brayyan cname.vercel-dns.com 1 min Proxied


## 2. Vercel (Frontend)

### Setup
1. Criar conta em vercel.com
2. Conectar repositorio GitHub
3. Configurar projeto:
 - Framework: Vite
 - Build Command: npm run build
 - Output Directory: dist
 - Install Command: npm install
4. Adicionar dominio: brayyan.helpusbr.com
5. Configurar variaveis de ambiente:
 - VITE_API_URL = https://api-brayyan.railway.app

### Deploy
- Automatico via GitHub (push na main)
- Preview deployments em PRs

## 3. Railway (Backend + Database)

### Setup Backend
1. Criar conta em railway.app
2. New Project -> Deploy from GitHub repo
3. Selecionar repositorio (pasta /backend)
4. Configurar variaveis de ambiente:
 - DATABASE_URL (auto-preenchido pelo Railway)
 - SECRET_KEY
 - JWT_ALGORITHM = HS256
 - ACCESS_TOKEN_EXPIRE_MINUTES = 1440
 - CORS_ORIGINS = https://brayyan.helpusbr.com
 - ENVIRONMENT = production
5. Configurar dominio: api-brayyan.railway.app

### Setup Database
1. Adicionar PostgreSQL ao projeto no Railway
2. Railway gera DATABASE_URL automaticamente
3. Rodar migrations: railway run alembic upgrade head

### Setup Redis (para Celery)
1. Adicionar Redis ao projeto (ou usar Upstash free tier)
2. Configurar REDIS_URL

## 4. GitHub Actions (CI/CD)

### Pipeline Frontend
yaml
name: Deploy Frontend
on:
 push:
 branches: [main]
 paths: ['frontend/**']
jobs:
 deploy:
 runs-on: ubuntu-latest
 steps:
 - uses: actions/checkout@v4
 - uses: actions/setup-node@v4
 - run: cd frontend && npm ci && npm run build
 - run: npx vercel deploy --prod --token=${{ secrets.VERCEL_TOKEN }}


### Pipeline Backend
yaml
name: Deploy Backend
on:
 push:
 branches: [main]
 paths: ['backend/**']
jobs:
 deploy:
 runs-on: ubuntu-latest
 steps:
 - uses: actions/checkout@v4
 - uses: actions/setup-python@v5
 with:
 python-version: '3.12'
 - run: cd backend && pip install -r requirements.txt
 - run: cd backend && alembic upgrade head
 - name: Deploy to Railway
 uses: railwayapp/railway-cli-action@v1
 with:
 railway_token: ${{ secrets.RAILWAY_TOKEN }}


## 5. Comandos Uteis

### Desenvolvimento Local
bash
# Frontend
cd frontend && npm run dev

# Backend
cd backend && uvicorn main:app --reload

# Database (Docker local)
docker run -d -p 5432:5432 -e POSTGRES_PASSWORD=brayyan postgres:16

# Migrations
cd backend && alembic upgrade head

# Redis (Docker local)
docker run -d -p 6379:6379 redis:7


### Producao
bash
# Ver logs do backend
railway logs

# Rodar migrations em producao
railway run alembic upgrade head

# Shell no backend
railway shell


## 6. Checklist de Deploy Inicial

- [ ] Dominio helpusbr.com configurado na Cloudflare
- [ ] Subdominio brayyan.helpusbr.com criado (CNAME -> Vercel)
- [ ] Repositorio GitHub criado
- [ ] Projeto Vercel conectado ao repo
- [ ] Projeto Railway conectado ao repo
- [ ] PostgreSQL provisionado no Railway
- [ ] Redis provisionado no Railway
- [ ] Variaveis de ambiente configuradas
- [ ] Migrations rodadas
- [ ] Frontend build e deploy
- [ ] Backend deploy
- [ ] Teste de CORS (frontend acessando backend)
- [ ] Certificado SSL ativo (automatico no Vercel e Railway)
