---
description: Workflow para refatorações seguras no AoPonto-FoodService. Ativado com /refactor ou "refatorar", "reorganizar", "melhorar estrutura", "extrair", "renomear", "mover".
---

# Workflow: /refactor

## Quando usar
Melhorias internas de código sem alterar comportamento externo: extração de funções/classes, reorganização de camadas, renomeação, melhoria de tipagem, simplificação de lógica.

***

## Regra fundamental
> Refactor não muda comportamento externo. Se mudar contrato HTTP, Prisma schema, API de componente ou tipo exportado, é uma mudança de contrato — não refactor puro.

Se a mudança for realmente uma mudança de contrato: pausar e sinalizar antes de continuar.

***

## Passo 1 — Definir escopo
- Identificar: qual app/lib, qual módulo, quais arquivos.
- Confirmar objetivo: o que vai melhorar e por quê.
- Confirmar que o comportamento externo será preservado:
  - Contratos HTTP: sem alteração.
  - APIs públicas de componente ou lib: sem alteração.
  - Tipos exportados: sem alteração (ou com compatibilidade retroativa).
  - Comportamento de negócio: idêntico.
- Mapear riscos: quais módulos consomem o que será tocado.
- Se o escopo for amplo: quebrar em etapas menores e apresentar antes de começar.
- Se houver ambiguidade: **perguntar antes de prosseguir**.

***

## Passo 2 — Preparar
- Confirmar que testes existentes cobrem o comportamento a ser preservado.
- Se não houver testes suficientes: **adicionar testes antes do refactor**.
- Garantir que lint e typecheck passam antes de começar: `nx run {app}:lint && nx run {app}:typecheck`

***

## Passo 3 — Refatorar em etapas
- Uma etapa por vez: extrair, mover, renomear, simplificar.
- Nunca combinar refactor com bugfix ou feature no mesmo PR, salvo pedido explícito.
- Se alterar backend:
  - Preservar a estrutura de camadas (domain/application/infra/interface).
  - Se extrair para shared: verificar impacto em todos os módulos consumidores.
  - Não expor implementação de infra para fora da camada infra.
- Se alterar frontend:
  - Preservar comportamento das rotas e componentes.
  - Se mover para design system: verificar impacto em todos os consumidores.
- Se alterar design system:
  - Não quebrar API pública de componente.
  - Verificar impacto em apps consumidoras.

***

## Passo 4 — Validar por etapa
Após cada etapa de refactor:
- Backend: `nx run backend:test` + `nx run backend:typecheck`
- Frontend: `nx run frontend-web:test` + `nx run frontend-web:typecheck`
- Design system: `nx run design-system:test` + `nx run design-system:typecheck`
- Lint: `nx run {app}:lint` ou `npm run check`
- Se cruzar apps: `nx affected -t test`
- Confirmar: nenhum teste quebrou, nenhum tipo novo de erro.

***

## Passo 5 — Encerrar
Resumo obrigatório:
- **Objetivo do refactor:** (o que melhorou)
- **Escopo:** (app/lib + módulo + arquivos)
- **Comportamento externo alterado:** não (ou sinalizar exceção)
- **Arquivos modificados:**
- **Validações executadas:**
- **Impacto em CI/CD:**
- **Riscos pendentes:**
- **Próximo passo recomendado:**
