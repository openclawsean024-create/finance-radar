# finance-radar · CHANGELOG

> 對齊 SPEC v3.0.2 等級規格書（見 [`PRD/SPEC.md`](SPEC.md)）

---

## v3.0.2 — 2026-09-06 — PRD + GHA workflow

> v3.0.2 完成於 2026-09-06 by Sean 10-repo-fleet

### Added
- `PRD/SPEC.md` — v3.0.2 等級 9 章規格書
- `PRD/CHANGELOG.md` — 本檔
- `.github/workflows/ci.yml` — GHA 4-job workflow（test / build / deploy-to-Pages）

### Changed
- 無 production code 變更（純文件 + CI）

### Verified
- `npm run typecheck` — 0 error
- `npm test` — 11/11 passed (`tests/e2e.test.tsx`)
- `npm run build` — green; `dist/index.html` (redirect) + `dist/dashboard.html` (307 行)

### Known issues (pre-existing, not fixed in v3.0.2)
- `web/index.html` meta refresh 指向 `./public/dashboard.html`，但 Vite 部署時 `public/dashboard.html` 在 root 而非 `/public/`，正確路徑是 `./dashboard.html`（直接訪問 `https://<host>/finance-radar/dashboard.html` 可正常顯示）
- 無 ESLint 設定（純 Vite + TS，無 lint script）

---

## v3.0 — 2026-09-06 — 家服 dashboard design

- Commit `bd3747d` — `feat(ui): apply 家服 dashboard design`
- 新增 `web/public/dashboard.html`（307 行純 HTML + Tailwind CDN，印刷感 + mint 主題）

---

## v2.0 — 2026-09-06 — vite base + gh-pages config

- Commit `8b3845c` — `chore: vite base + gh-pages config`
- `web/vite.config.ts` 設定 `base: '/finance-radar/'`
- `web/package.json` 新增 `predeploy` / `deploy`（gh-pages）

---

## v1.0 — 2026-09-06 — Sprint 1+2 M1 SaaS MVP

- Commit `004ea0f` — `feat: finance-radar Sprint 1+2 — M1 SaaS MVP`
- 4 頁 React SPA：DashboardPage / AccountsPage / RemindersPage / ReceiptsPage
- localStorage CRUD + 6 個月 demo data seed
- 11 個 e2e + unit 測試

---

## v0.1 — Initial scaffold

- Commit `867e402` — `Initial commit`
- README + GOAL
- Vite + React 19 + TS 設定
- Tailwind 4 + React Router 7
