---
trigger: always_on
---

AoPonto-FoodService — Architecture Rule
---
description: Regras permanentes para o monorepo AoPonto-FoodService. Backend NestJS (Clean Architecture, SOLID, modular), frontend React Router v7 + Vite, design system com Radix UI + shadcn, testes Jest/Vitest, Biome, NX 22.
***

# AoPonto-FoodService — Architecture Rule

Este workspace é o sistema de gestão de restaurantes AoPonto.

## Mapa do monorepo
```
apps/
  backend/          → NestJS, Prisma, Postgres, Redis, Zod, Swagger, Jest
  backend-e2e/      → Playwright E2E do backend
  frontend-web/     → React Router v7, Vite, TailwindCSS v4, Zod, Orval, React Query, Axios, Vitest
  frontend-web-e2e/ → Playwright E2E do frontend
libs/
  design-system/    → React, Radix UI, shadcn, TailwindCSS v4, Storybook, Vitest
```

Ferramentas gerais: TypeScript 5.9, NX 22, Biome 2.4, Git, Docker (Postgres + Redis).

## Objetivo de comportamento
Agir como engenheiro sênior disciplinado, conservador e incremental.
Priorizar clareza, compatibilidade de contratos, reuso, baixo risco de regressão.

## Regras gerais obrigatórias
- Entender o contexto antes de editar.
- Identificar app/lib e módulo de negócio afetados.
- Preferir mudanças pequenas, locais e reversíveis.
- Preservar arquitetura existente antes de propor nova abstração.
- Explicar o plano antes de mudanças relevantes.
- Validar após mudanças significativas.
- Resumir impacto técnico ao final.
- Nunca assumir comportamento implícito sem verificar o código.
- Nunca criar abstração sem necessidade clara.
- Nunca adicionar dependência sem justificativa.
- Nunca executar ações destrutivas sem confirmação explícita.
- Nunca misturar refactor com feature nova, exceto se pedido.

## Regras de arquitetura — backend

Módulos existentes: auth, catalog, finance, inventory, orders, parties, system-settings, shared.

Estrutura esperada por módulo:
```
modules/{modulo}/
  domain/       → entidades, value objects, interfaces de repositório, erros de domínio
  application/  → use cases, DTOs, interfaces de serviço
  infra/        → repositórios Prisma, adapters Redis, providers externos
  interface/    → controllers, guards, pipes, interceptors NestJS
```

Regras:
- Regra de negócio não depende de NestJS, Prisma nem Redis.
- Prisma restrito à camada infra.
- Redis restrito à camada infra.
- Controllers e providers ficam na camada interface.
- DTOs ficam na camada application.
- Usar Zod onde já estiver no fluxo do módulo.
- Usar Factory Pattern quando houver composição explícita de criação.
- Antes de alterar um módulo: identificar impacto em contratos, banco, cache e módulos dependentes.
- Se alterar contrato HTTP: atualizar Swagger.
- Se alterar Prisma schema: considerar migration, seed e compatibilidade.
- Se alterar Redis: considerar invalidação, consistência e fallback.
- Se alterar módulo shared: considerar impacto em todos os consumidores.
- Adicionar ou ajustar testes Jest quando fizer sentido.

## Regras de arquitetura — frontend

Estrutura esperada:
```
app/
  routes/    → rotas via React Router v7 (file-based)
  components/ → componentes locais
  hooks/     → hooks customizados
  lib/       → clients Orval gerados, config Axios, React Query
  schemas/   → validações Zod
  types/     → tipos TypeScript locais
```

Regras:
- Preferir clients Orval gerados para consumo de API.
- Preferir React Query para estado de servidor.
- Evitar chamadas Axios ad hoc se já houver client padronizado.
- Validar entrada com Zod quando fizer parte do fluxo existente.
- Reutilizar design system antes de criar UI local.
- Não duplicar componente já existente em libs/design-system.
- Manter componentes pequenos, legíveis e tipados.

## Regras de arquitetura — design system
- Componentes compartilhados entre apps.
- Antes de criar componente: verificar se composição dos existentes resolve.
- Não quebrar API pública sem explicitar impacto.
- Não acoplar a tela específica de negócio.
- Preservar padrões Radix UI, shadcn e convenções do projeto.
- Alterações devem considerar impacto em apps consumidoras.

## Regras de contratos e integração
- Mudanças de contrato exigem coordenação backend → frontend.
- Se alterar Swagger/DTOs: verificar impacto em Orval e consumo do frontend.
- Se alterar schema de resposta, payload, paginação ou erros: destacar risco de regressão.
- Preferir compatibilidade retroativa.
- Se não for possível: sinalizar breaking change explicitamente.

## Regras de testes
- Backend: Jest (nx run backend:test)
- Frontend: Vitest (nx run frontend-web:test)
- E2E: Playwright (nx run backend-e2e:e2e | nx run frontend-web-e2e:e2e)
- Validar no menor escopo útil.
- Em bugfix: evidenciar causa raiz, adicionar/ajustar teste.
- Em refactor: preservar comportamento externo.
- Em feature: validar fluxo principal e impactos laterais.

## Regras de lint e format (Biome 2.4)
Comandos disponíveis na raiz:
- npm run lint    → biome lint .
- npm run format  → biome format . --write
- npm run check   → biome check --write .

Por escopo via NX:
- nx run backend:lint
- nx run frontend-web:lint
- nx run design-system:lint

Regras:
- Biome tem prioridade; não adicionar ESLint nem Prettier.
- Verificar .biomeignore para pastas geradas (dist, node_modules, saídas do Orval).
- Preferir lint por escopo afetado antes de rodar lint global.

## Regras de CI/CD
- Toda alteração deve considerar impacto em CI e CD.
- Em PRs: usar nx affected por padrão.
- Evitar pipeline global sem necessidade.

Targets NX disponíveis:
- nx affected -t lint
- nx affected -t test
- nx affected -t typecheck
- nx affected -t build
- nx affected -t e2e (apenas quando necessário)

Estratégia por escopo:
- Escopo local: nx run {app}:{target}
- Múltiplos projetos: nx affected -t {target}
- Transversal: nx run-many -t {target} --all (somente quando necessário)

Ampliar escopo quando a mudança tocar:
- libs compartilhadas
- contratos HTTP
- Prisma schema
- config NX (nx.json, project.json)
- Docker / docker-compose
- variáveis de ambiente
- pipelines

Ordem de release preferencial:
1. nx run backend:build
2. atualizar swagger.json
3. nx run frontend-web:orval (geração de clients)
4. nx run frontend-web:build
5. nx run design-system:build (se alterado)

Se alterar Prisma: considerar migration, ordem de deploy e rollback.
Se alterar Docker: considerar rebuild de imagem e validação de containers.
Se alterar env vars: sinalizar impacto operacional antes de concluir.

## Regras de Git
Nunca sem confirmação explícita:
- git reset destrutivo
- force push
- rm em massa
- drop/truncate/migration destrutiva
- exclusão de volumes ou containers Docker

Boas práticas:
- Preferir diffs pequenos e revisáveis.
- Informar quando a alteração pede commit separado.
- Se houver ambiguidade relevante: perguntar antes de seguir.

## Encerramento obrigatório
Ao concluir qualquer tarefa:
1. Objetivo executado
2. App/lib/módulo afetado
3. Arquivos alterados
4. Decisões tomadas
5. Validações executadas
6. Impacto em CI/CD
7. Riscos pendentes
8. Próximo passo recomendado
