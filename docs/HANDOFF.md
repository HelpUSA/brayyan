# Brayyan — Guia de Retomada

## Como retomar o projeto

### Pre-requisitos
- Python 3.12+
- Git
- Vercel CLI
- Railway CLI

### Setup local

bash
git clone https://github.com/HelpUSA/brayyan.git
cd brayyan
python -m venv .venv
.venv/Scripts/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000


### Deploy

bash
# Vercel (automatico via Git)
git push

# Railway (manual)
railway up


### Estrutura de pastas


brayyan/
├── main.py # FastAPI principal
├── config.py # Configuracoes
├── database.py # SQLAlchemy
├── requirements.txt # Dependencias
├── Procfile # Railway start command
├── railway.toml # Railway config
├── vercel.json # Vercel config
├── routers/ # Endpoints
│ ├── auth.py
│ ├── projects.py
│ ├── articles.py
│ ├── upload.py
│ ├── conflicts.py
│ └── export.py
├── services/ # Logica de negocio
│ ├── csv_parser.py
│ └── metrics.py
├── models/ # Modelos SQLAlchemy
├── schemas/ # Schemas Pydantic
├── static/ # Frontend estatico
│ ├── index.html
│ ├── rayyan.css
│ └── rayyan.js
├── data/ # CSVs de dados
│ ├── auto_include.csv
│ ├── auto_exclude.csv
│ └── consolidated_export.csv
└── docs/ # Documentacao


### Testar endpoints

bash
# Health
curl https://brayyan.vercel.app/api/health

# Artigos
curl https://brayyan.vercel.app/api/articles?limit=5

# Upload CSV
curl -X POST -F "file=@data/auto_include.csv" https://brayyan.vercel.app/api/upload/csv


### Chats da equipe

- ChatGPT Projeto Geral: implementacao
- DeepSeek NexosAI: revisao, correcao, deploy
