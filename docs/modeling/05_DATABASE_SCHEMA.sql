CREATE TABLE users (
 id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
 email VARCHAR(255) UNIQUE NOT NULL,
 name VARCHAR(255) NOT NULL,
 password_hash VARCHAR(255) NOT NULL,
 avatar_url TEXT,
 organization VARCHAR(255),
 plan VARCHAR(20) DEFAULT 'free',
 email_verified BOOLEAN DEFAULT FALSE,
 created_at TIMESTAMPTZ DEFAULT NOW(),
 updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE projects (
 id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
 user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
 title VARCHAR(500) NOT NULL,
 description TEXT,
 research_question TEXT,
 status VARCHAR(20) DEFAULT 'draft',
 settings_json JSONB DEFAULT '{}',
 created_at TIMESTAMPTZ DEFAULT NOW(),
 updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_projects_user_id ON projects(user_id);

CREATE TABLE articles (
 id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
 project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
 pmid VARCHAR(50),
 doi VARCHAR(255),
 pmcid VARCHAR(50),
 title TEXT NOT NULL,
 abstract TEXT,
 authors TEXT,
 journal VARCHAR(500),
 year INTEGER,
 keywords TEXT,
 url TEXT,
 source_file VARCHAR(255),
 created_at TIMESTAMPTZ DEFAULT NOW(),
 updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_articles_project_id ON articles(project_id);
CREATE INDEX idx_articles_pmid ON articles(pmid);
CREATE INDEX idx_articles_doi ON articles(doi);

CREATE TABLE decisions (
 id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
 article_id UUID NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
 reviewer_type VARCHAR(20) NOT NULL,
 decision VARCHAR(10) NOT NULL,
 confidence_score FLOAT,
 rationale TEXT,
 matched_keywords TEXT,
 detected_disease VARCHAR(255),
 detected_modality VARCHAR(255),
 exclude_reason VARCHAR(255),
 timestamp TIMESTAMPTZ,
 created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_decisions_article_id ON decisions(article_id);
CREATE INDEX idx_decisions_reviewer ON decisions(reviewer_type);

CREATE TABLE evidence (
 id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
 article_id UUID NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
 section VARCHAR(100),
 quote TEXT NOT NULL,
 field_type VARCHAR(100),
 value VARCHAR(255),
 is_eligible BOOLEAN DEFAULT FALSE,
 created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_evidence_article_id ON evidence(article_id);

CREATE TABLE conflicts (
 id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
 article_id UUID NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
 decision_a_id UUID NOT NULL REFERENCES decisions(id) ON DELETE CASCADE,
 decision_b_id UUID NOT NULL REFERENCES decisions(id) ON DELETE CASCADE,
 conflict_type VARCHAR(30) NOT NULL,
 resolved BOOLEAN DEFAULT FALSE,
 resolution_decision VARCHAR(10),
 resolved_by UUID REFERENCES users(id),
 resolved_at TIMESTAMPTZ,
 created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_conflicts_article_id ON conflicts(article_id);

CREATE TABLE labels (
 id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
 project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
 name VARCHAR(100) NOT NULL,
 color VARCHAR(7) DEFAULT '#6366f1',
 category VARCHAR(20) DEFAULT 'custom',
 created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_labels_project_id ON labels(project_id);

CREATE TABLE article_labels (
 id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
 article_id UUID NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
 label_id UUID NOT NULL REFERENCES labels(id) ON DELETE CASCADE,
 UNIQUE(article_id, label_id)
);

CREATE TABLE upload_sessions (
 id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
 project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
 filename VARCHAR(500) NOT NULL,
 file_type VARCHAR(20) NOT NULL,
 file_size INTEGER,
 rows_imported INTEGER DEFAULT 0,
 status VARCHAR(20) DEFAULT 'processing',
 error_message TEXT,
 created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_upload_sessions_project_id ON upload_sessions(project_id);
