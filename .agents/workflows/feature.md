---
description: Workflow para implementar features no AoPonto-FoodService. Ativado com /feature ou "implementar", "criar endpoint", "adicionar funcionalidade", "nova tela", "novo módulo".
---

# Workflow: /feature

## Quando usar
Implementação de nova funcionalidade, endpoint, tela, componente ou módulo no monorepo.

***

## Passo 1 — Entender o requisito
- Ler e confirmar o objetivo da feature.
- Identificar escopo: qual app/lib, qual módulo de negócio.
- Se backend: identificar módulo NestJS (catalog, orders, finance, inventory, parties, auth, system-settings, shared).
- Se frontend: identificar rota(s), componentes, hooks, clients Orval e schemas Zod afetados.
- Se full-stack: mapear contrato HTTP (endpoint, request, response, paginação, erros).
- Se usar design system: identificar componentes existentes reutilizáveis.
- Se houver ambiguidade sobre requisito ou contrato: **perguntar antes de começar**.

***

## Passo 2 — Planejar
Antes de escrever código, apresentar plano com:
- Módulo(s) afetado(s) e camada(s) tocadas.
- Contrato HTTP proposto (se backend ou integração).
- Componentes e rotas afetados (se frontend).
- Decisões arquiteturais relevantes.
- Riscos e impactos em CI/CD.
- Dependências de outras features ou contratos.
- Aguardar confirmação antes de implementar se a mudança for significativa.

***

## Passo 3 — Implementar (backend)
Seguir a estrutura de módulo:
```
modules/{modulo}/
  domain/       → entidades, value objects, interfaces de repositório, erros de domínio
  application/  → use cases, DTOs, interfaces de serviço
  infra/        → repositórios Prisma, adapters Redis, providers externos
  interface/    → controllers, guards, pipes, interceptors NestJS
```

Regras:
- Regra de negócio não depende de NestJS, Prisma nem Redis.
- DTOs ficam em application.
- Se Prisma: criar migration compatível, não destrutiva.
- Se Redis: definir invalidação e fallback.
- Se endpoint novo/alterado: atualizar Swagger.
- Se módulo shared: sinalizar impacto em todos os consumidores.

***

## Passo 4 — Implementar (frontend)
Seguir a estrutura:
```
app/
  routes/      → rota React Router v7
  components/  → componentes locais
  hooks/       → hooks customizados
  lib/         → clients Orval, React Query
  schemas/     → validações Zod
  types/       → tipos TypeScript locais
```

Regras:
- Regenerar clients Orval se o contrato do backend mudar.
- Usar React Query para estado de servidor.
- Validar formulários com Zod + react-hook-form + @hookform/resolvers (já no projeto).
- Reutilizar componentes do design system (Radix UI + shadcn) antes de criar UI local.
- Não duplicar componente já existente em libs.
- Manter componentes tipados e sem side effects implícitos.

***

## Passo 5 — Validar
- Testar o fluxo principal da feature.
- Backend: `nx run backend:test`
- Frontend: `nx run frontend-web:test`
- Design system (se alterado): `nx run design-system:test`
- Lint do escopo: `nx run {app}:lint`
- Typecheck: `nx run {app}:typecheck`
- Se a feature cruzar apps: `nx affected -t test`
- Confirmar ausência de regressão nos módulos vizinhos mais prováveis.

***

## Passo 6 — Encerrar
Resumo obrigatório:
- **Feature entregue:** (objetivo)
- **Módulo(s)/app(s) afetado(s):**
- **Arquivos criados/modificados:**
- **Contrato HTTP:** (se houver — endpoint, request, response)
- **Swagger atualizado:** (sim/não)
- **Orval regenerado:** (sim/não)
- **Validações executadas:**
- **Impacto em CI/CD:**
- **Riscos pendentes:**
- **Próximo passo:**
