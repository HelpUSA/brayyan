# Modelo de Dados — Brayyan

## 1. Entidades e Atributos

---

### 1.1 User (Usuario)

| Campo | Tipo | Descricao |
|-------|------|-----------|
| id | UUID | Primary Key |
| email | String (unique) | Email do usuario |
| name | String | Nome completo |
| password_hash | String | Hash da senha (bcrypt) |
| avatar_url | String (nullable) | Foto de perfil |
| organization | String (nullable) | Instituicao |
| plan | Enum | free, pro, enterprise |
| email_verified | Boolean | |
| created_at | Timestamp | |
| updated_at | Timestamp | |

---

### 1.2 Project (Projeto / Review)

| Campo | Tipo | Descricao |
|-------|------|-----------|
| id | UUID | Primary Key |
| user_id | UUID (FK) | Dono do projeto |
| title | String | Titulo da revisao sistematica |
| description | Text (nullable) | Descricao |
| research_question | Text (nullable) | Pergunta PICO/PICOS |
| status | Enum | draft, screening, fulltext, completed |
| settings_json | JSON | Configuracoes (blinding, labels, etc.) |
| created_at | Timestamp | |
| updated_at | Timestamp | |

---

### 1.3 Article (Artigo / Referencia)

| Campo | Tipo | Descricao |
|-------|------|-----------|
| id | UUID | Primary Key |
| project_id | UUID (FK) | Projeto ao qual pertence |
| pmid | String (indexed) | PubMed ID |
| doi | String (indexed) | DOI |
| pmcid | String (nullable) | PubMed Central ID |
| title | Text | Titulo do artigo |
| abstract | Text | Resumo/Abstract |
| authors | Text (nullable) | Autores |
| journal | String (nullable) | Periodico |
| year | Integer (nullable) | Ano de publicacao |
| keywords | Text (nullable) | Palavras-chave |
| url | String (nullable) | Link para o artigo |
| source_file | String (nullable) | Arquivo de origem do upload |
| created_at | Timestamp | |
| updated_at | Timestamp | |

---

### 1.4 Decision (Decisao)

| Campo | Tipo | Descricao |
|-------|------|-----------|
| id | UUID | Primary Key |
| article_id | UUID (FK) | Artigo |
| reviewer_type | Enum | watcher_a, watcher_b, human, consensus |
| decision | Enum | include, exclude, maybe |
| confidence_score | Float (0.0 - 1.0) | Score de confianca |
| rationale | Text (nullable) | Justificativa textual |
| matched_keywords | Text (nullable) | Keywords detectadas |
| detected_disease | String (nullable) | Doenca detectada |
| detected_modality | String (nullable) | Modalidade (ECG, Eco, etc.) |
| exclude_reason | String (nullable) | Razao de exclusao predefinida |
| timestamp | Timestamp | Momento da decisao |
| created_at | Timestamp | |

---

### 1.5 Evidence (Evidencia Extraida)

| Campo | Tipo | Descricao |
|-------|------|-----------|
| id | UUID | Primary Key |
| article_id | UUID (FK) | Artigo |
| section | String | Secao do artigo (methods, results, etc.) |
| quote | Text | Trecho extraido |
| field_type | String | Tipo (sensitivity, specificity, AUC, etc.) |
| value | String (nullable) | Valor numerico extraido |
| is_eligible | Boolean | Se o artigo e elegivel para inclusao |
| created_at | Timestamp | |

---

### 1.6 Conflict (Conflito)

| Campo | Tipo | Descricao |
|-------|------|-----------|
| id | UUID | Primary Key |
| article_id | UUID (FK) | Artigo |
| decision_a_id | UUID (FK) | Decisao do Watcher A |
| decision_b_id | UUID (FK) | Decisao do Watcher B |
| conflict_type | Enum | include_exclude, include_maybe, exclude_maybe |
| resolved | Boolean | Se foi resolvido |
| resolution_decision | Enum (nullable) | include, exclude, maybe (resolucao final) |
| resolved_by | UUID (nullable, FK) | Quem resolveu (usuario) |
| resolved_at | Timestamp (nullable) | |
| created_at | Timestamp | |

---

### 1.7 Label (Etiqueta / Categoria)

| Campo | Tipo | Descricao |
|-------|------|-----------|
| id | UUID | Primary Key |
| project_id | UUID (FK) | Projeto |
| name | String | Nome da label |
| color | String | Cor (hex) |
| category | Enum | include, exclude, maybe, custom |
| created_at | Timestamp | |

---

### 1.8 ArticleLabel (Relacionamento N:N)

| Campo | Tipo | Descricao |
|-------|------|-----------|
| id | UUID | Primary Key |
| article_id | UUID (FK) | |
| label_id | UUID (FK) | |

---

### 1.9 UploadSession (Sessao de Upload)

| Campo | Tipo | Descricao |
|-------|------|-----------|
| id | UUID | Primary Key |
| project_id | UUID (FK) | |
| filename | String | Nome do arquivo |
| file_type | Enum | watcher_a, watcher_b, consensus, fulltext, raw_articles |
| file_size | Integer | Tamanho em bytes |
| rows_imported | Integer | Registros importados |
| status | Enum | processing, completed, failed |
| error_message | Text (nullable) | |
| created_at | Timestamp | |

---

## 2. JSON de Configuracao do Projeto (settings_json)

json
{
 "blinding_enabled": true,
 "reviewer_a_name": "Watcher A (Sensivel)",
 "reviewer_b_name": "Watcher B (Restritivo)",
 "confidence_threshold": {
 "include": 0.70,
 "exclude": 0.40
 },
 "prisma_settings": {
 "show_duplicates": true,
 "show_fulltext_exclusions": true
 },
 "export_preferences": {
 "include_rationale": true,
 "include_evidence_quotes": true,
 "include_confidence_scores": true
 }
}


---

## 3. Workflow de Estados do Projeto


draft -> screening -> fulltext -> completed
 | | |
 | | +-- Evidencias extraidas
 | +-- Decisoes carregadas
 +-- Projeto criado, sem dados


---

## 4. Metricas Derivadas (nao armazenadas, calculadas)

| Metrica | Formula |
|---------|---------|
| Total de artigos | COUNT(articles) WHERE project_id = X |
| Incluidos | COUNT(decisions) WHERE decision = include AND reviewer = consensus |
| Excluidos | COUNT(decisions) WHERE decision = exclude AND reviewer = consensus |
| Maybe | COUNT(decisions) WHERE decision = maybe AND reviewer = consensus |
| Conflitos | COUNT(conflicts) WHERE resolved = false |
| Concordancia (%) | (auto_include + auto_exclude) / total * 100 |
| Cohens Kappa | 2 * (Po - Pe) / (total - Pe) onde Po = concordancia observada, Pe = esperada |
| Tempo medio de triagem | AVG(timestamp diferenca entre artigos) |
