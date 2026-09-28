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

  function renderArticle(article) {
    const div = document.createElement("div");
    div.className = "article";
    div.dataset.liveId = article.id;
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

    // Detailed view in Screening Tab
    setText("#detailTitle", article.title || "(sem título)");
    setText("#detailAbstract", article.abstract || "Nenhum resumo disponível.");
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

    if ($("#liveStatus")) {
      refreshAll().catch(err => setStatus(`Error: ${err.message}`));
    }
    if (localStorage.getItem("helpus_cookie_consent") === "true") {
      const banner = document.getElementById("cookieBanner");
      if (banner) banner.style.display = "none";
    }
  });
})();
