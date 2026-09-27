(() => {
  let selectedArticle = null;

  const $ = (sel) => document.querySelector(sel);
  const setText = (sel, value) => {
    const el = $(sel);
    if (el) el.textContent = value ?? "";
  };

  const setStatus = (msg) => setText("#liveStatus", msg);

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
    document.querySelectorAll("#liveArticleList .article").forEach(a => a.classList.remove("active"));
    if (element) element.classList.add("active");
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
    setStatus("Loading articles...");
    const data = await fetchJson("/api/articles/?limit=50");
    const box = $("#liveArticleList");
    if (!box) return;
    box.innerHTML = "";
    (data.articles || []).forEach(a => box.appendChild(renderArticle(a)));
    if ((data.articles || []).length) selectArticle(data.articles[0], box.querySelector(".article"));
    setStatus(`Loaded ${data.total || 0} article(s).`);
  }

  async function loadConflicts() {
    setStatus("Loading conflicts...");
    const data = await fetchJson("/api/conflicts/");
    const box = $("#liveConflictList");
    if (!box) return;
    box.innerHTML = "";
    if (!(data.conflicts || []).length) {
      box.innerHTML = "<div class='muted'>No conflicts.</div>";
    } else {
      data.conflicts.forEach(c => {
        const row = document.createElement("div");
        row.className = "statusItem";
        row.innerHTML = `<span>#${c.id} ${c.title || ""}</span><b>${c.a_decision || ""} vs ${c.b_decision || ""}</b>`;
        box.appendChild(row);
      });
    }
    setStatus(`Loaded ${data.total || 0} conflict(s).`);
  }

  async function uploadCsv() {
    const input = $("#csvFile");
    if (!input || !input.files || !input.files[0]) {
      setStatus("Select a CSV file first.");
      return;
    }
    setStatus("Uploading CSV...");
    const form = new FormData();
    form.append("file", input.files[0]);
    const data = await fetchJson("/api/upload/csv", { method: "POST", body: form });
    setStatus(`Imported ${data.imported_count || 0} record(s) from ${data.filename || "CSV"}.`);
    await refreshAll();
  }

  async function saveDecision(decision) {
    if (!selectedArticle) {
      setStatus("Select an article first.");
      return;
    }
    const note = $("#decisionNote")?.value || "";
    setStatus(`Saving ${decision} for article #${selectedArticle.id}...`);
    const data = await fetchJson(`/api/decisions/${selectedArticle.id}/decision`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ decision, note })
    });
    setStatus(`Saved decision: ${data.decision} for record ${data.record_id}.`);
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

    if (ev.target.closest(".topNotice .x")) {
      const notice = document.querySelector(".topNotice");
      if (notice) notice.style.display = "none";
    }

    const article = ev.target.closest(".article");
    if (article && !article.closest("#liveArticleList")) {
      document.querySelectorAll(".article").forEach(a => a.classList.remove("active"));
      article.classList.add("active");
      setText("#detailTitle", article.dataset.title);
      setText("#detailJournal", article.dataset.journal);
      setText("#detailDoi", article.dataset.doi);
      setText("#detailYear", article.dataset.year);
      setText("#detailAuthors", article.dataset.authors);
      setText("#detailAbstract", article.dataset.abstract);
    }

    try {
      if (ev.target.closest("#uploadCsvBtn")) await uploadCsv();
      if (ev.target.closest("#refreshLiveBtn")) await refreshAll();
      if (ev.target.closest("#loadArticlesBtn")) await loadArticles();
      if (ev.target.closest("#loadConflictsBtn")) await loadConflicts();

      const decisionBtn = ev.target.closest("[data-live-decision]");
      if (decisionBtn) await saveDecision(decisionBtn.dataset.liveDecision);
    } catch (err) {
      setStatus(`Error: ${err.message}`);
      console.error(err);
    }
  });

  window.addEventListener("load", () => {
    if ($("#liveStatus")) {
      refreshAll().catch(err => setStatus(`Error: ${err.message}`));
    }
  });
})();
