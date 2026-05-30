
(() => {
  const showTab = (id) => {
    document.querySelectorAll('.view').forEach(v => v.classList.toggle('active', v.id === id));
    document.querySelectorAll('.tab').forEach(t => t.classList.toggle('active', t.dataset.tab === id));
    window.scrollTo({top: 0, behavior: 'smooth'});
  };
  document.addEventListener('click', (ev) => {
    const tab = ev.target.closest('[data-tab]');
    if (tab) showTab(tab.dataset.tab);
    const go = ev.target.closest('[data-go]');
    if (go) showTab(go.dataset.go);
    if (ev.target.closest('.topNotice .x')) document.querySelector('.topNotice').style.display = 'none';
    const article = ev.target.closest('.article');
    if (article) {
      document.querySelectorAll('.article').forEach(a => a.classList.remove('active'));
      article.classList.add('active');
      document.querySelector('#detailTitle').textContent = article.dataset.title;
      document.querySelector('#detailJournal').textContent = article.dataset.journal;
      document.querySelector('#detailDoi').textContent = article.dataset.doi;
      document.querySelector('#detailYear').textContent = article.dataset.year;
      document.querySelector('#detailAuthors').textContent = article.dataset.authors;
      document.querySelector('#detailAbstract').textContent = article.dataset.abstract;
    }
  });
})();
