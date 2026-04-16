---
description: Workflow para corrigir bugs no AoPonto-FoodService (backend NestJS ou frontend React Router). Ativado com /bugfix ou "corrigir bug", "reproduzir erro", "investigar falha
---

# Workflow: /bugfix

## Quando usar
Bug identificado em qualquer camada: backend (NestJS), frontend (React Router v7) ou integração.

***

## Passo 1 — Localizar e entender o bug
- Identificar: qual app/lib e qual módulo.
- Ler o código relevante antes de qualquer alteração.
- Identificar a causa raiz (não apenas o sintoma).
- Se for backend: verificar camada afetada (domain, application, infra, interface).
- Se for frontend: verificar rota, componente, hook, client Orval ou schema Zod afetado.
- Se for integração: verificar contrato HTTP, schema de resposta, paginação, erros.
- Se for ambíguo: **perguntar antes de prosseguir**.

***

## Passo 2 — Reproduzir o bug
- Descrever o comportamento atual e o esperado.
- Identificar o teste que expõe o bug, ou criar um novo:
  - Backend: teste unitário Jest ou de integração.
  - Frontend: teste Vitest ou Playwright.
- Confirmar que o teste falha com o código atual antes de corrigir.

***

## Passo 3 — Corrigir
- Implementar correção no menor escopo possível.
- Preservar a arquitetura: não migrar de camada sem necessidade.
- Se alterar contrato HTTP: atualizar Swagger + considerar impacto em Orval + frontend.
- Se alterar Prisma: avaliar migration e compatibilidade.
- Se alterar Redis: avaliar invalidação e fallback.
- Se alterar módulo shared: avaliar impacto em todos os consumidores.
- Se alterar design system: avaliar impacto em apps consumidoras.
- Não incluir refactors não relacionados ao bug.

***

## Passo 4 — Validar
- Confirmar que o teste que expõe o bug agora passa.
- Rodar testes do escopo afetado:
  - Backend: `nx run backend:test`
  - Frontend: `nx run frontend-web:test`
  - Design system: `nx run design-system:test`
- Lint do escopo afetado: `nx run {app}:lint` ou `npm run check`
- Typecheck: `nx run {app}:typecheck`
- Confirmar ausência de regressão no escopo afetado.
- Se a correção atravessar apps: `nx affected -t test`

***

## Passo 5 — Encerrar
Resumo obrigatório:
- **Causa raiz:** (o que causou o bug)
- **Correção aplicada:** (o que foi alterado)
- **Arquivos modificados:** (lista)
- **Teste adicionado/ajustado:** (arquivo e descrição)
- **Validações executadas:** (quais targets NX rodaram)
- **Impacto em contrato/CI:** (se houver)
- **Riscos pendentes:** (se houver)
- **Próximo passo:** (se houver)
