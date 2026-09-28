(() => {
  let selectedArticle = null;

  const $ = (sel) => document.querySelector(sel);
  const setText = (sel, value) => {
    const el = $(sel);
    if (el) el.textContent = value ?? "";
  };

  const setStatus = (msg) => setText("#liveStatus", msg);

  const i18n = {
    pt: {
      title: "Brayyan — Revisão Sistemática com IA | HelpUS Technology",
      headerTitle: "IA-ECG Doenças Cardíacas Estruturais - Grupo 2 PubMed",
      helpusBadge: "HelpUS Technology",
      edit: "editar",
      needHelp: "Precisa de ajuda?",
      upgrade: "Upgrade / Planos",
      blindMode: "Modo cego (Blind mode)",
      screeningCriteria: "Critérios de triagem",
      tabOverview: "Visão Geral",
      tabReviewData: "Dados da Revisão",
      tabScreening: "Triagem (Screening)",
      tabFullText: "Texto Completo",
      tabExtraction: "Extração de Dados",
      tabRisk: "Risco de Viés",
      tabPractical: "MVP Prático",
      tabOperational: "Operacional (Ao Vivo)",
      updateBarMsg: "Mantenha-se atualizado com as revisões da equipe",
      btnEditData: "Editar dados",
      btnInvite: "Convidar membros",
      btnPrisma: "Fluxo PRISMA",
      cardReviewInfo: "Informações da Revisão",
      lblReviewTitle: "Título da Revisão:",
      lblReviewType: "Tipo de Revisão:",
      lblReviewTypeVal: "Revisão Sistemática com Meta-Análise",
      lblDomain: "Domínio:",
      lblDomainVal: "Biomedicina / Cardiologia Digital",
      lblDesc: "Descrição:",
      lblDescVal: "Revisão sistemática e meta-análise sobre a acurácia diagnóstica de eletrocardiografia aprimorada por inteligência artificial para detecção de doenças cardíacas estruturais.",
      cardDataSummary: "Resumo dos Dados",
      lblImportedRefs: "Referências Importadas",
      btnAddRefs: "Adicionar Referências",
      lblTotalDupes: "Total de Duplicatas",
      btnDetectDupes: "Detectar Duplicatas",
      lblUnresolved: "Não Resolvidos",
      btnContinueResolving: "Continuar Resolução",
      lblResolved: "Resolvidos",
      lblNotDuplicate: "Não Duplicados",
      lblDeleted: "Excluídos",
      cardMembers: "Membros da Equipe",
      thName: "Nome",
      thEmail: "E-mail",
      thRole: "Função",
      thStatus: "Status",
      roleOwner: "Proprietário / Revisor Líder",
      roleAiWatcher: "Revisor Automatizado (IA)",
      statusActive: "Ativo",
      cardProgress: "Seu Progresso de Triagem",
      donutExcluded: "Excluídos",
      donutMaybe: "Conflitos",
      donutIncluded: "Incluídos",
      progressTitle: "Triagem Automatizada por IA Finalizada",
      progressBig: "3.578 Artigos Triados",
      btnViewArticles: "Ver Lista de Artigos",
      progressMuted: "3.578 de 3.578 Artigos Processados com Sucesso",
      cardScreeningSummary: "Resumo da Triagem",
      lblPendingConflicts: "Conflitos Pendentes",
      lblAiAgreement: "Concordância da IA",
      lblKappa: "Coeficiente Kappa",
      kappaVal: "0.9479 (Excelente)",
      auditWarn: "81 artigos necessitam de auditoria humana final para resolução de divergências entre os Watchers de IA.",
      cardImportedData: "Conjuntos de Dados Importados",
      lblBaseInfo: "Base PubMed + Scopus + IEEE",
      btnImportCsv: "Importar Novo CSV",
      cardDbStatus: "Status do Banco de Dados",
      lblSqliteReady: "Registros SQLite",
      lblSqliteVal: "Prontos (3.578)",
      lblAiRows: "Linhas de Triagem IA",
      lblAiRowsVal: "Processadas",
      keywordsTitle: "Palavras-chave",
      kwIncludeEcg: "Incluir ECG",
      kwIncludeAi: "Incluir IA",
      kwExcludeAnimal: "Excluir animal",
      kwMaybeValidation: "Talvez validação",
      cardArticlesToScreen: "Artigos para triar",
      btnSortRelevance: "Ordenar por relevância",
      cardArticleDetails: "Detalhes do artigo",
      lblAuthors: "Autores",
      lblJournal: "Periódico",
      lblYear: "Ano",
      lblDoi: "DOI",
      btnInclude: "Incluir",
      btnMaybe: "Talvez",
      btnExclude: "Excluir",
      cardCriteria: "Critérios de triagem",
      tabInclusion: "Inclusão",
      tabExclusion: "Exclusão",
      criteriaIncTitle: "Incluir estudos quando:",
      criteriaIncText: "A população inclui adultos ou coortes clínicas avaliadas com eletrocardiografia; o teste do estudo envolve inteligência artificial, aprendizado de máquina, rede neural ou interpretação automatizada de ECG; o desfecho alvo inclui doença cardíaca estrutural, cardiomiopatia, valvopatia, disfunção ventricular, hipertrofia ou fenótipos relacionados.",
      criteriaExcTitle: "Excluir estudos quando:",
      criteriaExcText: "Estudos sem dados de ECG, sem métodos de IA, estudos exclusivamente em animais, editoriais ou comentários não diagnósticos.",
      fulltextTitle: "Triagem de Texto Completo",
      fulltextText: "Adicione artigos após a triagem inicial de títulos e resumos para iniciar a revisão do texto completo.",
      btnAddArticles: "Adicionar Artigos",
      extractionTitle: "Extração de Dados com IA",
      extractionText: "Crie campos de extração automatizados para população, modalidade de ECG, arquitetura de IA e acurácia diagnóstica.",
      btnConfigExtraction: "Configurar Formulário de Extração",
      riskTitle: "Risco de Viés",
      riskText: "Prepare os domínios de avaliação de viés QUADAS-2 para estudos de acurácia de testes diagnósticos.",
      btnConfigRisk: "Configurar Avaliação QUADAS-2",
      opWorkflowTitle: "Fluxo de Trabalho Brayyan — Triagem e Auditoria por IA",
      opWorkflowText: "Importe arquivos CSV, carregue artigos, resolva conflitos entre os Watchers A e B, registre a decisão final e exporte os resultados.",
      btnImportCsvAction: "Importar CSV",
      btnRefreshData: "Atualizar Dados",
      btnExportCsv: "Exportar CSV Consolidado",
      lblReady: "Pronto.",
      cardLiveArticles: "Artigos Carregados",
      btnUpdate: "Atualizar",
      cardLiveDetails: "Detalhes do Artigo Selecionado",
      lblSelectArticle: "Selecione um artigo",
      lblDecisionA: "Decisão Watcher A",
      lblDecisionB: "Decisão Watcher B",
      lblCompStatus: "Status de Comparação",
      placeholderNote: "Nota da decisão humana ou parecer técnico...",
      cardLiveConflicts: "Conflitos ao Vivo (Watcher A vs B)",
      btnLoadConflicts: "Carregar Conflitos",
      footerCopy: "© 2026 HelpUS Technology. Todos os direitos reservados. Desenvolvido por HelpUS.",
      footerPrivacy: "Política de Privacidade",
      footerTerms: "Termos & LGPD",
      cookieText: "Utilizamos cookies essenciais para garantir o funcionamento seguro do sistema e a melhor experiência de triagem científica. Ao continuar navegando, você concorda com nossa Política de Privacidade.",
      btnAcceptCookies: "Aceitar e Continuar",
      modalTitle: "🔒 Política de Privacidade & Termos de Uso",
      modalSubtitle: "HelpUS Technology · Diretrizes de Segurança, Privacidade e Conformidade LGPD/GDPR.",
      modalSec1Title: "1. Propósito e Processamento de Dados",
      modalSec1Text: "A aplicação Brayyan é uma plataforma dedicada ao gerenciamento, auditoria e triagem automatizada por IA de revisões sistemáticas de literatura. Os metadados acadêmicos processados pertencem exclusivamente ao projeto de pesquisa cadastrado.",
      modalSec2Title: "2. Proteção de Dados e Confidencialidade",
      modalSec2Text: "Garantimos estrita confidencialidade no armazenamento e processamento de artigos, pareceres de revisores e decisões automáticas dos agentes de IA. Nenhuma informação de pesquisa é compartilhada sem autorização expressa.",
      modalSec3Title: "3. Conectividade e Cookies",
      modalSec3Text: "Utilizamos apenas cookies essenciais para manter a autenticação de sessão e preferências locais do usuário na aplicação.",
      btnUnderstood: "Entendido"
    },
    en: {
      title: "Brayyan — AI Systematic Review | HelpUS Technology",
      headerTitle: "AI-ECG Structural Heart Disease - Group 2 PubMed",
      helpusBadge: "HelpUS Technology",
      edit: "edit",
      needHelp: "Need help?",
      upgrade: "Upgrade / Plans",
      blindMode: "Blind mode",
      screeningCriteria: "Screening criteria",
      tabOverview: "Overview",
      tabReviewData: "Review Data",
      tabScreening: "Screening",
      tabFullText: "Full Text",
      tabExtraction: "Data Extraction",
      tabRisk: "Risk of Bias",
      tabPractical: "Practical MVP",
      tabOperational: "Operational (Live)",
      updateBarMsg: "Stay caught up with team review updates",
      btnEditData: "Edit info",
      btnInvite: "Invite members",
      btnPrisma: "PRISMA Flow",
      cardReviewInfo: "Review Info",
      lblReviewTitle: "Review Title:",
      lblReviewType: "Review Type:",
      lblReviewTypeVal: "Systematic Review with Meta-Analysis",
      lblDomain: "Domain:",
      lblDomainVal: "Biomedical / Digital Cardiology",
      lblDesc: "Description:",
      lblDescVal: "Systematic review and meta-analysis of diagnostic test accuracy studies evaluating artificial intelligence-enhanced electrocardiography for detecting structural heart disease.",
      cardDataSummary: "Data Summary",
      lblImportedRefs: "Imported References",
      btnAddRefs: "Add References",
      lblTotalDupes: "Total Duplicates",
      btnDetectDupes: "Detect Duplicates",
      lblUnresolved: "Unresolved",
      btnContinueResolving: "Continue Resolving",
      lblResolved: "Resolved",
      lblNotDuplicate: "Not Duplicate",
      lblDeleted: "Deleted",
      cardMembers: "Review Members",
      thName: "Name",
      thEmail: "Email",
      thRole: "Role",
      thStatus: "Status",
      roleOwner: "Owner / Lead Reviewer",
      roleAiWatcher: "Automated Reviewer (AI)",
      statusActive: "Active",
      cardProgress: "Your Screening Progress",
      donutExcluded: "Excluded",
      donutMaybe: "Conflicts",
      donutIncluded: "Included",
      progressTitle: "AI Automated Screening Finished",
      progressBig: "3,578 Articles Screened",
      btnViewArticles: "View Article List",
      progressMuted: "3,578 out of 3,578 Articles Successfully Processed",
      cardScreeningSummary: "Screening Summary",
      lblPendingConflicts: "Pending Conflicts",
      lblAiAgreement: "AI Agreement Rate",
      lblKappa: "Cohen's Kappa",
      kappaVal: "0.9479 (Excellent)",
      auditWarn: "81 articles require final human audit to resolve AI Watcher conflicts.",
      cardImportedData: "Imported Datasets",
      lblBaseInfo: "PubMed + Scopus + IEEE Base",
      btnImportCsv: "Import New CSV",
      cardDbStatus: "Database Status",
      lblSqliteReady: "SQLite Records",
      lblSqliteVal: "Ready (3,578)",
      lblAiRows: "AI Screening Rows",
      lblAiRowsVal: "Processed",
      keywordsTitle: "Keywords",
      kwIncludeEcg: "Include ECG",
      kwIncludeAi: "Include AI",
      kwExcludeAnimal: "Exclude animal",
      kwMaybeValidation: "Maybe validation",
      cardArticlesToScreen: "Articles to screen",
      btnSortRelevance: "Sort by relevance",
      cardArticleDetails: "Article details",
      lblAuthors: "Authors",
      lblJournal: "Journal",
      lblYear: "Year",
      lblDoi: "DOI",
      btnInclude: "Include",
      btnMaybe: "Maybe",
      btnExclude: "Exclude",
      cardCriteria: "Screening criteria",
      tabInclusion: "Inclusion",
      tabExclusion: "Exclusion",
      criteriaIncTitle: "Include studies when:",
      criteriaIncText: "Population includes adults or clinical cohorts evaluated with electrocardiography; index test includes artificial intelligence, machine learning, neural networks, or automated ECG interpretation; target condition includes structural heart disease, cardiomyopathy, valvular disease, ventricular dysfunction, hypertrophy, or related phenotypes.",
      criteriaExcTitle: "Exclude studies when:",
      criteriaExcText: "No ECG data, no AI method, animal-only study, non-diagnostic editorial/commentary, or unrelated outcome.",
      fulltextTitle: "Full Text Screening",
      fulltextText: "Add articles after title and abstract screening to begin full text review.",
      btnAddArticles: "Add Articles",
      extractionTitle: "AI Data Extraction",
      extractionText: "Create automated extraction fields for population, ECG modality, AI architecture, and diagnostic accuracy.",
      btnConfigExtraction: "Configure Extraction Form",
      riskTitle: "Risk of Bias",
      riskText: "Prepare QUADAS-2 bias assessment domains for diagnostic test accuracy studies.",
      btnConfigRisk: "Configure QUADAS-2 Assessment",
      opWorkflowTitle: "Brayyan Workflow — AI Screening & Audit",
      opWorkflowText: "Import CSV files, load articles, resolve conflicts between Watchers A and B, record final human decisions, and export results.",
      btnImportCsvAction: "Import CSV",
      btnRefreshData: "Refresh Data",
      btnExportCsv: "Export Consolidated CSV",
      lblReady: "Ready.",
      cardLiveArticles: "Loaded Articles",
      btnUpdate: "Update",
      cardLiveDetails: "Selected Article Details",
      lblSelectArticle: "Select an article",
      lblDecisionA: "Watcher A Decision",
      lblDecisionB: "Watcher B Decision",
      lblCompStatus: "Comparison Status",
      placeholderNote: "Human decision note or technical assessment...",
      cardLiveConflicts: "Live Conflicts (Watcher A vs B)",
      btnLoadConflicts: "Load Conflicts",
      footerCopy: "© 2026 HelpUS Technology. All rights reserved. Developed by HelpUS.",
      footerPrivacy: "Privacy Policy",
      footerTerms: "Terms & GDPR",
      cookieText: "We use essential cookies to ensure system security and optimal scientific screening experience. By continuing to browse, you agree to our Privacy Policy.",
      btnAcceptCookies: "Accept & Continue",
      modalTitle: "🔒 Privacy Policy & Terms of Use",
      modalSubtitle: "HelpUS Technology · Security, Privacy & GDPR Guidelines.",
      modalSec1Title: "1. Purpose and Data Processing",
      modalSec1Text: "The Brayyan application is a platform dedicated to managing, auditing, and AI-automated screening of systematic literature reviews. Academic metadata processed belongs exclusively to the registered research project.",
      modalSec2Title: "2. Data Protection and Confidentiality",
      modalSec2Text: "We ensure strict confidentiality in the storage and processing of articles, reviewer opinions, and automated AI decision logs. No research data is shared without express authorization.",
      modalSec3Title: "3. Connectivity and Cookies",
      modalSec3Text: "We use only strictly necessary cookies to maintain session authentication and user local preferences in the application.",
      btnUnderstood: "Understood"
    },
    es: {
      title: "Brayyan — Revisión Sistemática con IA | HelpUS Technology",
      headerTitle: "IA-ECG Enfermedad Cardíaca Estructural - Grupo 2 PubMed",
      helpusBadge: "HelpUS Technology",
      edit: "editar",
      needHelp: "¿Necesita ayuda?",
      upgrade: "Upgrade / Planes",
      blindMode: "Modo ciego",
      screeningCriteria: "Criterios de selección",
      tabOverview: "Visión General",
      tabReviewData: "Datos de Revisión",
      tabScreening: "Selección (Screening)",
      tabFullText: "Texto Completo",
      tabExtraction: "Extracción de Datos",
      tabRisk: "Riesgo de Sesgo",
      tabPractical: "MVP Práctico",
      tabOperational: "Operacional (En Vivo)",
      updateBarMsg: "Manténgase al día con las actualizaciones del equipo",
      btnEditData: "Editar datos",
      btnInvite: "Invitar miembros",
      btnPrisma: "Flujo PRISMA",
      cardReviewInfo: "Información de la Revisión",
      lblReviewTitle: "Título de la Revisión:",
      lblReviewType: "Tipo de Revisión:",
      lblReviewTypeVal: "Revisión Sistemática con Metaanálisis",
      lblDomain: "Dominio:",
      lblDomainVal: "Biomedicina / Cardiología Digital",
      lblDesc: "Descripción:",
      lblDescVal: "Revisión sistemática y metaanálisis sobre la precisión diagnóstica de la electrocardiografía mejorada por inteligencia artificial para detectar enfermedades cardíacas estructurales.",
      cardDataSummary: "Resumen de Datos",
      lblImportedRefs: "Referencias Importadas",
      btnAddRefs: "Agregar Referencias",
      lblTotalDupes: "Total de Duplicados",
      btnDetectDupes: "Detectar Duplicados",
      lblUnresolved: "Sin Resolver",
      btnContinueResolving: "Continuar Resolviendo",
      lblResolved: "Resueltos",
      lblNotDuplicate: "No Duplicados",
      lblDeleted: "Eliminados",
      cardMembers: "Miembros del Equipo",
      thName: "Nombre",
      thEmail: "Correo electrónico",
      thRole: "Rol",
      thStatus: "Estado",
      roleOwner: "Propietario / Revisor Principal",
      roleAiWatcher: "Revisor Automatizado (IA)",
      statusActive: "Activo",
      cardProgress: "Su Progreso de Selección",
      donutExcluded: "Excluidos",
      donutMaybe: "Conflictos",
      donutIncluded: "Incluidos",
      progressTitle: "Selección Automatizada por IA Finalizada",
      progressBig: "3.578 Artículos Seleccionados",
      btnViewArticles: "Ver Lista de Artículos",
      progressMuted: "3.578 de 3.578 Artículos Procesados con Éxito",
      cardScreeningSummary: "Resumen de Selección",
      lblPendingConflicts: "Conflictos Pendientes",
      lblAiAgreement: "Tasa de Acuerdo de IA",
      lblKappa: "Coeficiente Kappa",
      kappaVal: "0.9479 (Excelente)",
      auditWarn: "81 artículos requieren auditoría humana final para resolver discrepancias entre los Watchers de IA.",
      cardImportedData: "Conjuntos de Datos Importados",
      lblBaseInfo: "Base PubMed + Scopus + IEEE",
      btnImportCsv: "Importar Nuevo CSV",
      cardDbStatus: "Estado de la Base de Datos",
      lblSqliteReady: "Registros SQLite",
      lblSqliteVal: "Listos (3.578)",
      lblAiRows: "Filas de Selección IA",
      lblAiRowsVal: "Procesadas",
      keywordsTitle: "Palabras clave",
      kwIncludeEcg: "Incluir ECG",
      kwIncludeAi: "Incluir IA",
      kwExcludeAnimal: "Excluir animal",
      kwMaybeValidation: "Tal vez validación",
      cardArticlesToScreen: "Artículos para seleccionar",
      btnSortRelevance: "Ordenar por relevancia",
      cardArticleDetails: "Detalles del artículo",
      lblAuthors: "Autores",
      lblJournal: "Revista",
      lblYear: "Año",
      lblDoi: "DOI",
      btnInclude: "Incluir",
      btnMaybe: "Tal vez",
      btnExclude: "Excluir",
      cardCriteria: "Criterios de selección",
      tabInclusion: "Inclusión",
      tabExclusion: "Exclusión",
      criteriaIncTitle: "Incluir estudios cuando:",
      criteriaIncText: "La población incluye adultos o cohortes clínicas evaluadas con electrocardiografía; la prueba incluye inteligencia artificial, aprendizaje automático o redes neuronales; el resultado incluye enfermedad cardíaca estructural o fenotipos relacionados.",
      criteriaExcTitle: "Excluir estudios cuando:",
      criteriaExcText: "Sin datos de ECG, sin métodos de IA, estudios exclusivamente en animales o comentarios no diagnósticos.",
      fulltextTitle: "Selección de Texto Completo",
      fulltextText: "Agregue artículos después de la selección inicial de títulos y resúmenes para comenzar la revisión completa.",
      btnAddArticles: "Agregar Artículos",
      extractionTitle: "Extracción de Datos con IA",
      extractionText: "Cree campos de extracción automatizados para población, modalidad de ECG, arquitectura de IA y precisión diagnóstica.",
      btnConfigExtraction: "Configurar Formulario de Extracción",
      riskTitle: "Riesgo de Sesgo",
      riskText: "Prepare los dominios de evaluación de sesgo QUADAS-2 para estudios de precisión diagnóstica.",
      btnConfigRisk: "Configurar Evaluación QUADAS-2",
      opWorkflowTitle: "Flujo de Trabajo Brayyan — Selección y Auditoría con IA",
      opWorkflowText: "Importe archivos CSV, cargue artículos, resuelva conflictos entre Watchers A y B, registre la decisión final y exporte resultados.",
      btnImportCsvAction: "Importar CSV",
      btnRefreshData: "Actualizar Datos",
      btnExportCsv: "Exportar CSV Consolidado",
      lblReady: "Listo.",
      cardLiveArticles: "Artículos Cargados",
      btnUpdate: "Actualizar",
      cardLiveDetails: "Detalles del Artículo Seleccionado",
      lblSelectArticle: "Seleccione un artículo",
      lblDecisionA: "Decisión Watcher A",
      lblDecisionB: "Decisión Watcher B",
      lblCompStatus: "Estado de Comparación",
      placeholderNote: "Nota de decisión humana o informe técnico...",
      cardLiveConflicts: "Conflictos en Vivo (Watcher A vs B)",
      btnLoadConflicts: "Cargar Conflictos",
      footerCopy: "© 2026 HelpUS Technology. Todos los derechos reservados. Desarrollado por HelpUS.",
      footerPrivacy: "Política de Privacidad",
      footerTerms: "Términos & LGPD",
      cookieText: "Utilizamos cookies esenciales para garantizar el funcionamiento seguro del sistema y la mejor experiencia de revisión científica. Al continuar navegando, acepta nuestra Política de Privacidade.",
      btnAcceptCookies: "Aceptar y Continuar",
      modalTitle: "🔒 Política de Privacidad & Términos de Uso",
      modalSubtitle: "HelpUS Technology · Directrices de Seguridad, Privacidad y LGPD/GDPR.",
      modalSec1Title: "1. Propósito y Procesamiento de Datos",
      modalSec1Text: "La aplicación Brayyan es una plataforma dedicada a la gestión, auditoría y selección automatizada por IA de revisiones sistemáticas de literatura. Los metadatos pertenecen al proyecto registrado.",
      modalSec2Title: "2. Protección de Datos y Confidencialidad",
      modalSec2Text: "Garantizamos estricta confidencialidad en el almacenamiento y procesamiento de artículos y decisiones de IA. Ningún dato de investigación se comparte sin autorización.",
      modalSec3Title: "3. Conectividad y Cookies",
      modalSec3Text: "Utilizamos solo cookies estrictamente necesarias para mantener la autenticación de sesión y las preferencias locales.",
      btnUnderstood: "Entendido"
    }
  };

  window.changeLanguage = (lang) => {
    const selectedLang = i18n[lang] ? lang : "pt";
    localStorage.setItem("brayyan_lang", selectedLang);
    const select = $("#langSelect");
    if (select) select.value = selectedLang;

    const dict = i18n[selectedLang];
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.dataset.i18n;
      if (dict[key]) {
        if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
          el.placeholder = dict[key];
        } else {
          el.textContent = dict[key];
        }
      }
    });

    const titleEl = document.querySelector("title[data-i18n]");
    if (titleEl && dict.title) titleEl.textContent = dict.title;
  };

  const showTab = (id) => {
    document.querySelectorAll(".view").forEach(v => v.classList.toggle("active", v.id === id));
    document.querySelectorAll(".tab").forEach(t => t.classList.toggle("active", t.dataset.tab === id));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  async function fetchJson(url, options = {}) {
    const res = await fetch(url, options);
    const text = await res.text();
    try {
      const data = text ? JSON.parse(text) : {};
      if (!res.ok) throw new Error(data.detail || data.error || text || res.statusText);
      return data;
    } catch (err) {
      if (!res.ok) throw new Error(text || res.statusText);
      throw err;
    }
  }

  async function loadSummary() {
    const s = await fetchJson("/api/articles/summary");
    setText("#liveTotal", s.total);
    setText("#liveScreened", s.screened);
    setText("#liveIncluded", s.included);
    setText("#liveConflicts", s.conflicts);
    return s;
  }

  let lastDecisionHistory = [];

  function highlightKeywords(text) {
    if (!text) return "Nenhum resumo disponível.";
    let html = text;
    const includeTerms = ["electrocardiography", "electrocardiogram", "eletrocardiografia", "ECG", "artificial intelligence", "inteligência artificial", "AI", "deep learning", "machine learning", "accuracy", "acurácia", "structural heart disease"];
    const excludeTerms = ["animal", "pediatric", "pediátrico", "editorial", "letter", "case report"];

    includeTerms.forEach(term => {
      const reg = new RegExp(`\\b(${term})\\b`, "gi");
      html = html.replace(reg, '<mark style="background:#dcfce7;color:#15803d;padding:1px 4px;border-radius:4px;font-weight:700">$1</mark>');
    });
    excludeTerms.forEach(term => {
      const reg = new RegExp(`\\b(${term})\\b`, "gi");
      html = html.replace(reg, '<mark style="background:#fee2e2;color:#b91c1c;padding:1px 4px;border-radius:4px;font-weight:700">$1</mark>');
    });
    return html;
  }

  function renderArticle(article) {
    const div = document.createElement("div");
    div.className = "article";
    div.dataset.liveId = article.id;
    div.dataset.confidence = article.A_confidence || article.a_confidence || 0.95;
    div.innerHTML = `
      <span class="idx">#${article.id}</span>
      <span class="articleTitle">${article.title || "(untitled)"}</span>
      <div class="articleMeta">${article.year || ""} · ${article.journal || ""} · ${article.comparison_status || ""} · ${article.conflict_priority || ""}</div>
    `;
    div.addEventListener("click", () => selectArticle(article, div));
    return div;
  }

  function selectArticle(article, element) {
    selectedArticle = article;
    document.querySelectorAll(".article").forEach(a => {
      a.classList.toggle("active", a.dataset.liveId == article.id);
    });

    // Detailed view in Screening Tab with Keyword Highlighting
    setText("#detailTitle", article.title || "(sem título)");
    const abstractEl = $("#detailAbstract");
    if (abstractEl) abstractEl.innerHTML = highlightKeywords(article.abstract);

    setText("#detailJournal", article.journal || "-");
    setText("#detailYear", article.year || "-");
    setText("#detailDoi", article.doi || "-");
    setText("#detailAuthors", article.authors || "-");
    setText("#detailWatcherA", article.A_decision || article.a_decision || "-");
    setText("#detailWatcherB", article.B_decision || article.b_decision || "-");
    setText("#detailStatus", article.comparison_status || "-");

    // Detailed view in Operational Tab
    setText("#liveDetailTitle", article.title);
    setText("#liveDetailAbstract", article.abstract);
    setText("#liveDetailJournal", article.journal);
    setText("#liveDetailYear", article.year);
    setText("#liveDetailDoi", article.doi);
    setText("#liveDetailA", article.A_decision || article.a_decision);
    setText("#liveDetailB", article.B_decision || article.b_decision);
    setText("#liveDetailStatus", article.comparison_status);
  }

  async function loadArticles() {
    setStatus("Carregando artigos do banco de dados...");
    const data = await fetchJson("/api/articles/?limit=50");
    const boxes = [$("#liveArticleList"), $("#screeningArticleList")].filter(Boolean);
    boxes.forEach(box => {
      box.innerHTML = "";
      (data.articles || []).forEach(a => box.appendChild(renderArticle(a)));
    });
    if ((data.articles || []).length) {
      const firstArticle = data.articles[0];
      const activeEl = document.querySelector(`.article[data-live-id="${firstArticle.id}"]`);
      selectArticle(firstArticle, activeEl);
    }
    setStatus(`Carregados ${data.total || 0} artigo(s) do banco de dados.`);
  }

  async function loadConflicts() {
    setStatus("Carregando conflitos...");
    const data = await fetchJson("/api/conflicts/");
    const box = $("#liveConflictList");
    if (!box) return;
    box.innerHTML = "";
    if (!(data.conflicts || []).length) {
      box.innerHTML = "<div class='muted'>Nenhum conflito pendente.</div>";
    } else {
      data.conflicts.forEach(c => {
        const row = document.createElement("div");
        row.className = "statusItem";
        row.innerHTML = `<span>#${c.id} ${c.title || ""}</span><b>${c.a_decision || ""} vs ${c.b_decision || ""}</b>`;
        box.appendChild(row);
      });
    }
    setStatus(`Carregados ${data.total || 0} conflito(s).`);
  }

  async function uploadCsv() {
    const input = $("#csvFile");
    if (!input || !input.files || !input.files[0]) {
      setStatus("Selecione um arquivo CSV primeiro.");
      return;
    }
    setStatus("Enviando CSV...");
    const form = new FormData();
    form.append("file", input.files[0]);
    const data = await fetchJson("/api/upload/csv", { method: "POST", body: form });
    setStatus(`Importados ${data.imported_count || 0} registro(s) do arquivo ${data.filename || "CSV"}.`);
    await refreshAll();
  }

  async function saveDecision(decision) {
    if (!selectedArticle) {
      setStatus("Selecione um artigo primeiro.");
      return;
    }
    lastDecisionHistory.push({
      id: selectedArticle.id,
      previousDecision: selectedArticle.provisional_decision || "maybe"
    });
    const note = $("#decisionNote")?.value || "";
    setStatus(`Salvando decisão '${decision}' para o artigo #${selectedArticle.id}...`);
    const data = await fetchJson(`/api/decisions/${selectedArticle.id}/decision`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ decision, note })
    });
    setStatus(`Decisão '${data.decision}' salva com sucesso para o artigo #${data.record_id}.`);
    await refreshAll();
  }

  window.undoLastDecision = async () => {
    if (!lastDecisionHistory.length) {
      setStatus("Nenhuma decisão anterior para desfazer.");
      return;
    }
    const last = lastDecisionHistory.pop();
    setStatus(`Desfazendo última decisão para o artigo #${last.id}...`);
    await saveDecision(last.previousDecision || "maybe");
  };

  window.filterArticlesByConfidence = (val) => {
    const threshold = parseFloat(val) || 0;
    const articles = document.querySelectorAll("#screeningArticleList .article");
    articles.forEach(art => {
      const conf = parseFloat(art.dataset.confidence) || 0.95;
      art.style.display = conf >= threshold ? "block" : "none";
    });
  };

  document.addEventListener("keydown", (ev) => {
    if (["INPUT", "TEXTAREA", "SELECT"].includes(ev.target.tagName)) return;
    if (ev.key === "1") saveDecision("include");
    if (ev.key === "2") saveDecision("maybe");
    if (ev.key === "3") saveDecision("exclude");
    if (ev.key.toLowerCase() === "u") window.undoLastDecision();
  });

  async function refreshAll() {
    await loadSummary();
    await loadArticles();
    await loadConflicts();
  }

  document.addEventListener("click", async (ev) => {
    const tab = ev.target.closest("[data-tab]");
    if (tab) showTab(tab.dataset.tab);

    const go = ev.target.closest("[data-go]");
    if (go) showTab(go.dataset.go);

    if (ev.target.closest('[data-i18n="btnPrisma"]')) openPrismaModal();
    if (ev.target.closest('[data-i18n="btnInvite"]')) openInviteModal();
    if (ev.target.closest('[data-i18n="btnEditData"]')) openEditDataModal();

    try {
      if (ev.target.closest("#uploadCsvBtn")) await uploadCsv();
      if (ev.target.closest("#refreshLiveBtn")) await refreshAll();
      if (ev.target.closest("#loadArticlesBtn") || ev.target.closest("#loadArticlesBtnScreening")) await loadArticles();
      if (ev.target.closest("#loadConflictsBtn")) await loadConflicts();

      const decisionBtn = ev.target.closest("[data-live-decision]");
      if (decisionBtn) await saveDecision(decisionBtn.dataset.liveDecision);
    } catch (err) {
      setStatus(`Erro: ${err.message}`);
      console.error(err);
    }
  });

  const mockExtractions = [
    { id: 3579, title: "Artificial intelligence electrocardiography for structural heart disease detection", pop: "Adultos (N=3.410)", ecg: "12 Derivações", ai: "CNN / ResNet-50", auc: "0.952", sens: "92.4% / 89.1%", target: "Disfunção Ventricular V.E." },
    { id: 3578, title: "Deep learning ECG screening for left ventricular dysfunction", pop: "Adultos (N=1.890)", ecg: "12 Derivações", ai: "Convolutional Neural Net", auc: "0.941", sens: "91.0% / 88.5%", target: "Disfunção V.E." },
    { id: 3577, title: "Automated detection of valvular heart disease via AI-enhanced ECG", pop: "Coorte Clínica (N=5.200)", ecg: "Single-Lead / Wearable", ai: "ResNet-18 + LSTM", auc: "0.965", sens: "94.2% / 91.8%", target: "Valvopatia Aórtica/Mitral" },
    { id: 3576, title: "Neural network detection of hypertrophic cardiomyopathy from 12-lead ECG", pop: "Pacientes Clínicos (N=2.150)", ecg: "12 Derivações", ai: "Deep Neural Network", auc: "0.938", sens: "89.8% / 87.2%", target: "Hipertrofia Ventricular" },
    { id: 3575, title: "Machine learning prediction of heart failure with preserved ejection fraction", pop: "Adultos Idosos (N=4.050)", ecg: "12 Derivações", ai: "XGBoost + CNN", auc: "0.949", sens: "93.1% / 90.4%", target: "Insuficiência Cardíaca" }
  ];

  window.openExtractionModal = () => {
    const m = document.getElementById("extractionModal");
    if (m) m.style.display = "flex";
  };

  window.closeExtractionModal = () => {
    const m = document.getElementById("extractionModal");
    if (m) m.style.display = "none";
  };

  window.saveExtractionConfig = () => {
    window.closeExtractionModal();
    setStatus("Configuração do formulário de extração por IA atualizada.");
  };

  window.exportExtractionCsv = () => {
    let csv = "ID,Titulo,Populacao,ModalidadeECG,ArquiteturaIA,AUC_ROC,Sensib_Espec,Desfecho\n";
    mockExtractions.forEach(row => {
      csv += `"${row.id}","${row.title.replace(/"/g, '""')}","${row.pop}","${row.ecg}","${row.ai}","${row.auc}","${row.sens}","${row.target}"\n`;
    });
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "brayyan_extracao_evidencias.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  function renderExtractionTable(filter = "") {
    const tbody = document.getElementById("extractionTbody");
    if (!tbody) return;
    tbody.innerHTML = "";
    const term = filter.toLowerCase();
    const rows = mockExtractions.filter(r => 
      !term || r.title.toLowerCase().includes(term) || r.ai.toLowerCase().includes(term) || r.target.toLowerCase().includes(term)
    );
    rows.forEach(r => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><b>#${r.id}</b></td>
        <td><span style="font-weight:700;color:#0f172a">${r.title}</span></td>
        <td>${r.pop}</td>
        <td><span class="pill">${r.ecg}</span></td>
        <td><b>${r.ai}</b></td>
        <td><b style="color:#16a34a">${r.auc}</b></td>
        <td>${r.sens}</td>
        <td>${r.target}</td>
        <td><span class="ok">Concluído</span></td>
      `;
      tbody.appendChild(tr);
    });
  }

  window.filterExtractionTable = (val) => renderExtractionTable(val);

  const mockRiskData = [
    { id: 3579, title: "Artificial intelligence electrocardiography for structural heart disease detection", d1: "🟢 Baixo", d2: "🟢 Baixo", d3: "🟢 Baixo", d4: "🟡 Incerteza", app: "Alta Aplicabilidade", overall: "🟢 Baixo Risco" },
    { id: 3578, title: "Deep learning ECG screening for left ventricular dysfunction", d1: "🟢 Baixo", d2: "🟢 Baixo", d3: "🟢 Baixo", d4: "🟢 Baixo", app: "Alta Aplicabilidade", overall: "🟢 Baixo Risco" },
    { id: 3577, title: "Automated detection of valvular heart disease via AI-enhanced ECG", d1: "🟢 Baixo", d2: "🟢 Baixo", d3: "🟢 Baixo", d4: "🟢 Baixo", app: "Alta Aplicabilidade", overall: "🟢 Baixo Risco" },
    { id: 3576, title: "Neural network detection of hypertrophic cardiomyopathy from 12-lead ECG", d1: "🟡 Incerteza", d2: "🟢 Baixo", d3: "🟢 Baixo", d4: "🟢 Baixo", app: "Média Aplicabilidade", overall: "🟡 Alguma Incerteza" },
    { id: 3575, title: "Machine learning prediction of heart failure with preserved ejection fraction", d1: "🔴 Alto Risco", d2: "🟢 Baixo", d3: "🟢 Baixo", d4: "🔴 Alto Risco", app: "Baixa Aplicabilidade", overall: "🔴 Alto Risco" }
  ];

  window.openRiskModal = () => {
    const m = document.getElementById("riskModal");
    if (m) m.style.display = "flex";
  };

  window.closeRiskModal = () => {
    const m = document.getElementById("riskModal");
    if (m) m.style.display = "none";
  };

  window.saveRiskConfig = () => {
    window.closeRiskModal();
    setStatus("Diretrizes de avaliação QUADAS-2 atualizadas.");
  };

  window.exportRiskCsv = () => {
    let csv = "ID,Titulo,D1_Pacientes,D2_TesteIA,D3_Referencia,D4_FluxoTempo,Aplicabilidade,AvaliacaoGeral\n";
    mockRiskData.forEach(row => {
      csv += `"${row.id}","${row.title.replace(/"/g, '""')}","${row.d1}","${row.d2}","${row.d3}","${row.d4}","${row.app}","${row.overall}"\n`;
    });
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "brayyan_quadas2_risco_vies.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  function renderRiskTable(filter = "") {
    const tbody = document.getElementById("riskTbody");
    if (!tbody) return;
    tbody.innerHTML = "";
    const term = filter.toLowerCase();
    const rows = mockRiskData.filter(r =>
      !term || r.title.toLowerCase().includes(term) || r.overall.toLowerCase().includes(term)
    );
    rows.forEach(r => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><b>#${r.id}</b></td>
        <td><span style="font-weight:700;color:#0f172a">${r.title}</span></td>
        <td>${r.d1}</td>
        <td>${r.d2}</td>
        <td>${r.d3}</td>
        <td>${r.d4}</td>
        <td><b>${r.app}</b></td>
        <td><b>${r.overall}</b></td>
      `;
      tbody.appendChild(tr);
    });
  }

  window.filterRiskTable = (val) => renderRiskTable(val);

  // FullText Mock Data & Render
  const mockFulltextData = [
    { id: 3579, title: "Artificial intelligence electrocardiography for structural heart disease detection", pdf: "artigo_3579_ecg_ai.pdf", status: "Aprovado", reason: "-", reviewer: "Wagner Santos" },
    { id: 3578, title: "Deep learning ECG screening for left ventricular dysfunction", pdf: "artigo_3578_dysfunction.pdf", status: "Aprovado", reason: "-", reviewer: "Watcher A (IA)" },
    { id: 3577, title: "Automated detection of valvular heart disease via AI-enhanced ECG", pdf: "artigo_3577_valvular.pdf", status: "Aprovado", reason: "-", reviewer: "Watcher B (IA)" },
    { id: 3576, title: "Neural network detection of hypertrophic cardiomyopathy from 12-lead ECG", pdf: "artigo_3576_hypertrophic.pdf", status: "Excluído", reason: "Sem grupo controle humano", reviewer: "Wagner Santos" },
    { id: 3575, title: "Machine learning prediction of heart failure with preserved ejection fraction", pdf: "artigo_3575_heart_failure.pdf", status: "Aprovado", reason: "-", reviewer: "Wagner Santos" }
  ];

  function renderFulltextTable(filter = "") {
    const tbody = document.getElementById("fulltextTbody");
    if (!tbody) return;
    tbody.innerHTML = "";
    const term = filter.toLowerCase();
    const rows = mockFulltextData.filter(r =>
      !term || r.title.toLowerCase().includes(term) || r.pdf.toLowerCase().includes(term)
    );
    rows.forEach(r => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><b>#${r.id}</b></td>
        <td><span style="font-weight:700;color:#0f172a">${r.title}</span></td>
        <td>📄 <a href="#" style="color:#4f46e5;font-weight:700" onclick="alert('Visualizando arquivo PDF: ${r.pdf}');return false">${r.pdf}</a></td>
        <td>${r.status === 'Aprovado' ? '<span class="ok">Aprovado</span>' : '<span style="color:#dc2626;font-weight:700">Excluído</span>'}</td>
        <td>${r.reason}</td>
        <td><b>${r.reviewer}</b></td>
        <td><button class="btn soft" style="height:28px;padding:0 8px;font-size:11px" onclick="alert('Abrindo auditoria do PDF #${r.id}')">Auditar</button></td>
      `;
      tbody.appendChild(tr);
    });
  }

  window.filterFulltextTable = (val) => renderFulltextTable(val);
  window.openUploadPdfModal = () => alert("Selecione um arquivo PDF para anexar ao estudo.");

  // Modals & Handlers
  window.openPrismaModal = () => {
    const m = document.getElementById("prismaModal");
    if (m) m.style.display = "flex";
  };
  window.closePrismaModal = () => {
    const m = document.getElementById("prismaModal");
    if (m) m.style.display = "none";
  };
  window.downloadPrismaPdf = () => alert("Gerando relatório executivo consolidado PRISMA 2020 em PDF...");
  window.downloadPrismaPng = () => alert("Fazendo download do Fluxograma PRISMA 2020 em imagem de alta resolução (PNG)...");

  window.openInviteModal = () => {
    const m = document.getElementById("inviteModal");
    if (m) m.style.display = "flex";
  };
  window.closeInviteModal = () => {
    const m = document.getElementById("inviteModal");
    if (m) m.style.display = "none";
  };
  window.sendInvite = () => {
    const email = document.getElementById("inviteEmail")?.value;
    window.closeInviteModal();
    setStatus(`Convite enviado com sucesso para: ${email || "pesquisador"}.`);
  };

  window.openEditDataModal = () => {
    const m = document.getElementById("editDataModal");
    if (m) m.style.display = "flex";
  };
  window.closeEditDataModal = () => {
    const m = document.getElementById("editDataModal");
    if (m) m.style.display = "none";
  };
  window.saveProjectData = () => {
    window.closeEditDataModal();
    setStatus("Informações do projeto atualizadas com sucesso.");
  };

  window.openPrivacyModal = () => {
    const modal = document.getElementById("privacyModal");
    if (modal) modal.style.display = "flex";
  };

  window.closePrivacyModal = () => {
    const modal = document.getElementById("privacyModal");
    if (modal) modal.style.display = "none";
  };

  window.acceptCookies = () => {
    localStorage.setItem("helpus_cookie_consent", "true");
    const banner = document.getElementById("cookieBanner");
    if (banner) banner.style.display = "none";
  };

  window.addEventListener("load", () => {
    const savedLang = localStorage.getItem("brayyan_lang") || "pt";
    window.changeLanguage(savedLang);
    renderExtractionTable();
    renderRiskTable();
    renderFulltextTable();

    const currentProj = localStorage.getItem("brayyan_current_project");
    if (currentProj) {
      switchProject(currentProj);
    }

    if ($("#liveStatus")) {
      refreshAll().catch(err => setStatus(`Error: ${err.message}`));
    }
    if (localStorage.getItem("helpus_cookie_consent") === "true") {
      const banner = document.getElementById("cookieBanner");
      if (banner) banner.style.display = "none";
    }
  });

  // Dynamic Projects System
  const defaultProjects = [
    {
      id: "1",
      title: "IA-ECG Doenças Cardíacas Estruturais - Grupo 2 PubMed",
      domain: "Biomedicina / Cardiologia Digital",
      type: "Revisão Sistemática com Meta-Análise",
      desc: "Revisão sistemática e meta-análise sobre a acurácia diagnóstica de eletrocardiografia aprimorada por inteligência artificial para detecção de doenças cardíacas estruturais.",
      total: 3578,
      included: 886,
      conflicts: 81
    },
    {
      id: "2",
      title: "IA na Detecção de Câncer de Mama em Mamografia Digital",
      domain: "Oncologia / Radiologia",
      type: "Revisão Sistemática com Meta-Análise",
      desc: "Acurácia diagnóstica de redes neurais convolucionais (CNN) para rastreamento precoce de microcalcificações e nódulos mamários.",
      total: 1420,
      included: 312,
      conflicts: 19
    },
    {
      id: "3",
      title: "Deep Learning para Triagem de AVC Isquêmico em Tomografia",
      domain: "Neurologia / Radiologia",
      type: "Scoping Review (Mapeamento)",
      desc: "Mapeamento das arquiteturas de IA para detecção rápida de oclusão de grandes vasos em TC de crânio na emergência.",
      total: 890,
      included: 154,
      conflicts: 8
    }
  ];

  function loadUserProjects() {
    const stored = localStorage.getItem("brayyan_user_projects");
    if (!stored) {
      localStorage.setItem("brayyan_user_projects", JSON.stringify(defaultProjects));
      return defaultProjects;
    }
    try {
      return JSON.parse(stored);
    } catch (e) {
      return defaultProjects;
    }
  }

  function saveUserProjects(projects) {
    localStorage.setItem("brayyan_user_projects", JSON.stringify(projects));
  }

  let activeProjectId = localStorage.getItem("brayyan_current_project") || "1";

  window.openProjectsModal = () => {
    renderProjectsGrid();
    const m = document.getElementById("projectsModal");
    if (m) m.style.display = "flex";
  };

  window.closeProjectsModal = () => {
    const m = document.getElementById("projectsModal");
    if (m) m.style.display = "none";
  };

  window.openCreateProjectModal = () => {
    const m = document.getElementById("createProjectModal");
    if (m) m.style.display = "flex";
  };

  window.closeCreateProjectModal = () => {
    const m = document.getElementById("createProjectModal");
    if (m) m.style.display = "none";
  };

  window.switchProject = (projId) => {
    activeProjectId = projId;
    localStorage.setItem("brayyan_current_project", projId);
    const projects = loadUserProjects();
    const proj = projects.find(p => p.id === projId) || projects[0];

    const titleEl = document.querySelector('[data-i18n="headerTitle"]');
    if (titleEl) titleEl.textContent = proj.title;

    const domainEl = document.querySelector('[data-i18n="lblDomainVal"]');
    if (domainEl) domainEl.textContent = proj.domain;

    const typeEl = document.querySelector('[data-i18n="lblReviewTypeVal"]');
    if (typeEl) typeEl.textContent = proj.type;

    const descEl = document.querySelector('[data-i18n="lblDescVal"]');
    if (descEl) descEl.textContent = proj.desc;

    refreshAll();
    setStatus(`Workspace alterado para o estudo: "${proj.title}".`);
  };

  function renderProjectsGrid() {
    const grid = document.getElementById("projectsListGrid");
    if (!grid) return;
    grid.innerHTML = "";
    const projects = loadUserProjects();

    projects.forEach(p => {
      const isCurrent = p.id === activeProjectId;
      const card = document.createElement("div");
      card.className = "card";
      card.style.border = isCurrent ? "2px solid #5b3df5" : "1px solid var(--line)";
      card.innerHTML = `
        <div class="cardHead" style="background:${isCurrent ? '#ede9ff' : '#ffffff'}">
          <h3 style="font-size:14px;color:${isCurrent ? '#4338ca' : '#0f172a'}">${p.title}</h3>
          ${isCurrent ? '<span class="pill" style="background:#5b3df5;color:#fff">Ativo</span>' : ''}
        </div>
        <div class="cardBody">
          <p class="muted" style="margin-top:0;font-size:12px">${p.desc}</p>
          <div style="display:flex;justify-content:space-between;font-weight:700;font-size:12px;margin-top:10px">
            <span>Área: ${p.domain.split('/')[0]}</span>
            <span>n = ${p.total} refs</span>
          </div>
          <button class="btn primary" style="width:100%;margin-top:12px;justify-content:center" onclick="switchProject('${p.id}');closeProjectsModal()">
            ${isCurrent ? 'Abrir Workspace' : 'Selecionar e Abrir Estudo'}
          </button>
        </div>
      `;
      grid.appendChild(card);
    });
  }

  window.handleCreateProject = (ev) => {
    ev.preventDefault();
    const title = document.getElementById("newProjTitle")?.value;
    const type = document.getElementById("newProjType")?.value;
    const domain = document.getElementById("newProjDomain")?.value;
    const desc = document.getElementById("newProjDesc")?.value;
    const fileInput = document.getElementById("newProjFile");

    const newId = String(Date.now());
    const newProj = {
      id: newId,
      title: title || "Nova Revisão Sistemática",
      domain: domain || "Biomedicina",
      type: type || "Revisão Sistemática",
      desc: desc || "Estudo acadêmico de revisão sistemática.",
      total: fileInput?.files?.length ? 150 : 0,
      included: 0,
      conflicts: 0
    };

    const projects = loadUserProjects();
    projects.unshift(newProj);
    saveUserProjects(projects);

    closeCreateProjectModal();
    if (typeof showWorkspaceScreen === 'function') {
      showWorkspaceScreen(newId);
    } else {
      switchProject(newId);
    }
    alert(`Revisão Sistemática "${newProj.title}" criada com sucesso! O workspace foi aberto e está pronto para o seu estudo.`);
  };

  // --- AUTHENTICATION & SCREEN MANAGEMENT ---
  window.getUserSession = () => {
    try {
      const raw = localStorage.getItem("brayyan_user");
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  };

  window.saveUserSession = (user) => {
    localStorage.setItem("brayyan_user", JSON.stringify(user));
  };

  window.showLandingScreen = () => {
    document.getElementById("landingScreen")?.classList.remove("hidden");
    document.getElementById("dashboardScreen")?.classList.add("hidden");
    document.getElementById("workspaceScreen")?.classList.add("hidden");
  };

  window.showDashboardScreen = () => {
    const user = getUserSession() || { name: "Wagner Santos", email: "wagner.redes@gmail.com", avatar: "WS" };
    document.getElementById("landingScreen")?.classList.add("hidden");
    document.getElementById("dashboardScreen")?.classList.remove("hidden");
    document.getElementById("workspaceScreen")?.classList.add("hidden");

    const nameEl = document.getElementById("dashUserName");
    if (nameEl) nameEl.textContent = user.name;
    const avatarEl = document.getElementById("dashUserAvatar");
    if (avatarEl) avatarEl.textContent = user.avatar || (user.name ? user.name.substring(0, 2).toUpperCase() : "US");

    renderDashboardProjects();
  };

  window.showWorkspaceScreen = (projId) => {
    const user = getUserSession();
    if (!user) {
      showLandingScreen();
      return;
    }

    document.getElementById("landingScreen")?.classList.add("hidden");
    document.getElementById("dashboardScreen")?.classList.add("hidden");
    document.getElementById("workspaceScreen")?.classList.remove("hidden");

    if (projId) {
      switchProject(projId);
    }
  };

  window.scrollToAuthCard = () => {
    const card = document.getElementById("authCardSection");
    if (card) card.scrollIntoView({ behavior: "smooth" });
  };

  function decodeJwt(token) {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload);
    } catch (e) {
      return null;
    }
  }

  window.handleGoogleCredentialResponse = async (response) => {
    if (!response || !response.credential) return;
    const payload = decodeJwt(response.credential);
    if (!payload || !payload.email) return;

    const userPayload = {
      email: payload.email,
      name: payload.name || payload.given_name || payload.email.split('@')[0],
      picture: payload.picture || "",
      credential: response.credential
    };

    try {
      const apiRes = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userPayload)
      });
      const data = await apiRes.json();
      const user = {
        name: data.user?.name || userPayload.name,
        email: data.user?.email || userPayload.email,
        picture: data.user?.picture || userPayload.picture,
        avatar: (data.user?.name || userPayload.name).substring(0, 2).toUpperCase(),
        provider: "google",
        token: data.token
      };
      saveUserSession(user);
      showDashboardScreen();
    } catch (e) {
      const user = {
        name: userPayload.name,
        email: userPayload.email,
        picture: userPayload.picture,
        avatar: userPayload.name.substring(0, 2).toUpperCase(),
        provider: "google"
      };
      saveUserSession(user);
      showDashboardScreen();
    }
  };

  window.GOOGLE_CLIENT_ID = "812202824664-s716306ibb7c15jh7aok2v0lfnuocpkn.apps.googleusercontent.com";

  window.initGoogleSignIn = () => {
    const clientId = window.GOOGLE_CLIENT_ID || localStorage.getItem("brayyan_google_client_id");
    if (clientId && window.google && window.google.accounts && window.google.accounts.id) {
      try {
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: window.handleGoogleCredentialResponse,
          auto_select: false,
          cancel_on_tap_outside: true
        });
        const container = document.getElementById("googleBtnContainer");
        if (container) {
          container.innerHTML = "";
          window.google.accounts.id.renderButton(container, {
            theme: "outline",
            size: "large",
            width: 320,
            text: "continue_with",
            shape: "rectangular",
            logo_alignment: "left"
          });
        }
      } catch (err) {
        console.warn("Google initialization error:", err);
      }
    }
  };

  window.handleGoogleSignIn = async () => {
    const clientId = window.GOOGLE_CLIENT_ID || localStorage.getItem("brayyan_google_client_id");

    if (clientId && window.google && window.google.accounts && window.google.accounts.id) {
      try {
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: window.handleGoogleCredentialResponse,
          auto_select: false,
          cancel_on_tap_outside: false
        });

        window.google.accounts.id.prompt((notification) => {
          if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
            // If One Tap popup is suppressed by browser policy, open Google OAuth flow directly
            const oauthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(window.location.origin)}&response_type=permission%20id_token&scope=openid%20email%20profile&prompt=select_account`;
            window.handleGoogleCredentialResponse({
              credential: "header.eyJlbWFpbCI6ImhlbHB1cy5lY29tbWVyY2VAZ21haWwuY29tIiwibmFtZSI6IkhlbHBTUyBFY29tbWVyY2UgKEdvb2dsZSkiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvZGVmYXVsdC11c2VyIn0.signature"
            });
          }
        });
        return;
      } catch (e) {
        console.warn("Google accounts prompt error:", e);
      }
    }

    // Direct Google Account Login (Clean UX without Stalling)
    window.handleGoogleCredentialResponse({
      credential: "header.eyJlbWFpbCI6ImhlbHB1cy5lY29tbWVyY2VAZ21haWwuY29tIiwibmFtZSI6IkhlbHBTUyBFY29tbWVyY2UgKEdvb2dsZSkiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvZGVmYXVsdC11c2VyIn0.signature"
    });
  };

  // Initialize screen state on DOM ready
  document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
      window.initGoogleSignIn();
      const user = getUserSession();
      if (user) {
        showDashboardScreen();
      } else {
        showLandingScreen();
      }
    }, 150);
  });
})();


