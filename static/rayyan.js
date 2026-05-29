(() => {
 const fallbackArticles = [
 {title:'Artificial intelligence-enabled ECG screening for structural heart disease', journal:'Cardiology AI Review', year:'2026', doi:'demo/ai-ecg-001', abstract:'Fallback demonstration record shown when the live API has no imported dataset yet.', status:'agreement'},
 {title:'Machine learning analysis of electrocardiograms for valve disease detection', journal:'Digital Health Methods', year:'2026', doi:'demo/ai-ecg-002', abstract:'Mock screening record used to keep the review interface usable while Railway or CSV import is pending.', status:'conflict'},
 {title:'Deep learning ECG phenotypes associated with cardiomyopathy', journal:'Clinical ECG Informatics', year:'2025', doi:'demo/ai-ecg-003', abstract:'Example article for UI fallback mode. Replace by imported CSV or database records when available.', status:'maybe'}
 ];
 const safe = (v, f='') => (v === null || v === undefined || v === '' ? f : String(v));
 const esc = (v) => safe(v).replace(/[&<>]/g, c => ({'&':'&','<':'<','>':'>'}[c]));
 const showTab = (id) => {
 document.querySelectorAll('.view').forEach(v => v.classList.toggle('active', v.id === id));
 document.querySelectorAll('.tab').forEach(t => t.classList.toggle('active', t.dataset.tab === id));
 window.scrollTo({top: 0, behavior: 'smooth'});
 };
 const notice = (msg) => {
 const el = document.querySelector('.topNotice span:nth-child(2)');
 if (el) el.textContent = msg;
 };
 const details = (a) => {
 const map = {detailTitle:a.title, detailJournal:a.journal, detailDoi:a.doi, detailYear:a.year, detailAuthors:'AI reviewers A/B', detailAbstract:a.abstract};
 Object.entries(map).forEach(([id,val]) => { const el = document.getElementById(id); if (el) el.textContent = safe(val); });
 };
 const render = (rows, source) => {
 const list = document.querySelector('.articleList') || document.querySelector('.articlesList') || document.querySelector('#screening .cardBody');
 if (list && rows.length) {
 list.innerHTML = rows.map((a,i) => <div class='article ${i === 0 ? 'active' : ''}' data-title='${esc(a.title)}' data-journal='${esc(a.journal)}' data-doi='${esc(a.doi)}' data-year='${esc(a.year)}' data-authors='AI reviewers A/B' data-abstract='${esc(a.abstract)}'><div class='artTitle'>${esc(a.title)}</div><div class='artMeta'>${esc(a.journal)} ${esc(a.year)} · ${esc(a.doi)}</div><div class='chips'><span class='chip'>${esc(a.status || a.comparison_status || a.provisional_decision || 'pending')}</span></div></div>).join('');
 }
 details(rows[0] || {});
 notice(source === 'api' ? Brayyan loaded ${rows.length} records from API. : 'Brayyan stable: showing fallback review data until persistent import is restored.');
 };
 const load = async () => {
 try {
 const r = await fetch('/api/articles?project_id=1&limit=25', {headers:{accept:'application/json'}});
 if (!r.ok) throw new Error('api');
 const data = await r.json();
 const rows = Array.isArray(data.articles) && data.articles.length ? data.articles : fallbackArticles;
 render(rows, rows === fallbackArticles ? 'fallback' : 'api');
 } catch (e) {
 render(fallbackArticles, 'fallback');
 }
 };
 document.addEventListener('click', (ev) => {
 const tab = ev.target.closest('[data-tab]'); if (tab) showTab(tab.dataset.tab);
 const go = ev.target.closest('[data-go]'); if (go) showTab(go.dataset.go);
 if (ev.target.closest('.topNotice .x')) document.querySelector('.topNotice').style.display = 'none';
 const art = ev.target.closest('.article');
 if (art) {
 document.querySelectorAll('.article').forEach(a => a.classList.remove('active'));
 art.classList.add('active');
 details({title:art.dataset.title, journal:art.dataset.journal, doi:art.dataset.doi, year:art.dataset.year, abstract:art.dataset.abstract});
 }
 });
 document.addEventListener('DOMContentLoaded', load);
})();
