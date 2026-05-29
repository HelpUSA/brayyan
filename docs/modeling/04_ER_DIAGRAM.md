# MER — Modelo Entidade-Relacionamento (Brayyan)

---

## 1. Diagrama de Entidades


┌─────────────────────────────────────────────────────────────────┐
│ BRYAN - ER DIAGRAM │
└─────────────────────────────────────────────────────────────────┘

 ┌──────────┐ ┌──────────────┐
 │ USER │1───────*│ PROJECT │
 └──────────┘ └──────┬───────┘
 │1
 │
 ┌────────────┼────────────┐
 │ │ │
 │* │* │*
 ┌─────┴─────┐ ┌───┴──────┐ ┌──┴───────────┐
 │ ARTICLE │ │ LABEL │ │ UPLOAD_SESSION│
 └─────┬─────┘ └───┬──────┘ └──────────────┘
 │ │
 │* │
 ┌────┼────┐ │
 │ │ │ │
 │ │ └───────┼──────────┐
 │ │ │ │
 ┌────┴──┐ │ ┌───┴────┐ ┌───┴────────┐
 │DECISION│ │ │ARTICLE_LABEL│
 └───┬────┘ │ └────────────┘
 │ │
 │ │
 ┌────┴──────┴──┐
 │ │
 ┌────┴─────┐ ┌─────┴─────┐
 │ CONFLICT │ │ EVIDENCE │
 └──────────┘ └───────────┘


---

## 2. Relacionamentos

| Entidade A | Cardinalidade | Entidade B | Descricao |
|------------|---------------|------------|-----------|
| User | 1 : N | Project | Um usuario tem varios projetos |
| Project | 1 : N | Article | Um projeto tem varios artigos |
| Project | 1 : N | Label | Um projeto tem varias labels |
| Project | 1 : N | UploadSession | Um projeto tem varias sessoes de upload |
| Article | 1 : N | Decision | Um artigo tem varias decisoes (A, B, consenso) |
| Article | 1 : N | Evidence | Um artigo tem varias evidencias extraidas |
| Article | N : N | Label | Um artigo pode ter varias labels |
| Decision | 1 : 1 | Conflict | Duas decisoes geram um conflito |

---

## 3. Regras de Negocio

1. Um artigo tem exatamente 2 decisoes primarias (watcher_a + watcher_b) e 1 de consenso
2. Um conflito existe quando watcher_a.decision != watcher_b.decision
3. auto_include ocorre quando A=include E B=include
4. auto_exclude ocorre quando A=exclude E B=exclude
5. Todo conflito tem exatamente 2 decisoes associadas (uma de A, uma de B)
6. Uma evidencia so existe se o artigo foi classificado como include no consenso

---

## 4. Diagrama de Estados (Decision Lifecycle)


 ┌─────────┐
 │ UPLOAD │
 └────┬────┘
 │
 ▼
 ┌─────────────────────┐
 │ DECISION_WATCHER_A │
 └──────────┬──────────┘
 │
 ▼
 ┌─────────────────────┐
 │ DECISION_WATCHER_B │
 └──────────┬──────────┘
 │
 ┌──────────┴──────────┐
 │ │
 ▼ ▼
 ┌─────────────────┐ ┌─────────────────┐
 │ CONSENSO │ │ CONFLITO │
 │ (A = B) │ │ (A != B) │
 └────────┬────────┘ └────────┬────────┘
 │ │
 ▼ ▼
 ┌─────────────────┐ ┌─────────────────┐
 │ INCLUDE/EXCLUDE │ │ HUMAN RESOLUTION│
 │ AUTOMATICO │ │ (opcional) │
 └─────────────────┘ └─────────────────┘

