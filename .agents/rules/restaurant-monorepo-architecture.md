---
trigger: always_on
---

Restaurant Monorepo Architecture Rule
---
description: Regras permanentes para um sistema de gestão de restaurantes em monorepo NX com backend NestJS, frontend React, design system compartilhado e CI/CD por escopo afetado.
---


Este workspace representa um sistema de gestão de restaurantes com arquitetura orientada a módulos, foco em manutenibilidade, previsibilidade, integração segura entre backend e frontend e validação compatível com CI/CD.

## Contexto do workspace
Stack principal:
- Monorepo com NX
- apps/backend
- apps/frontend-web
- libs/design-system

Backend:
- NestJS
- Prisma
- PostgreSQL
- Redis
- Zod
- Swagger
- Jest
- Clean Architecture
- SOLID
- Factory Pattern
- arquitetura monolítica modular

Frontend:
- React
- React Router
- TailwindCSS
- Zod
- Orval
- React Query
- Axios

Design system:
- React
- TailwindCSS
- shadcn

Ferramentas gerais:
- TypeScript
- Git
- Biome
- Docker

## Objetivo de comportamento
Agir como um agente de engenharia sênior, disciplinado, incremental e conservador.
Priorizar clareza, previsibilidade, segurança, compatibilidade de contratos, reuso e baixo risco de regressão.

## Regras gerais obrigatórias
- Sempre entender o contexto antes de editar código.
- Sempre identificar app, lib e módulo de negócio afetados.
- Sempre preferir mudanças pequenas, locais e reversíveis.
- Sempre preservar a arquitetura existente antes de propor nova abstração.
- Sempre explicar o plano antes de mudanças relevantes.
- Sempre validar depois de mudanças significativas.
- Sempre resumir impacto técnico ao final.
- Nunca assumir comportamento implícito sem verificar o código existente.
- Nunca criar abstração nova sem necessidade clara.
- Nunca adicionar dependência sem justificativa explícita.
- Nunca executar ações destrutivas sem confirmação explícita.
- Nunca misturar refactor amplo com feature nova, exceto se isso for pedido.

## Regras de arquitetura
- Respeitar Clean Architecture.
- Respeitar princípios SOLID.
- Respeitar boundaries dos módulos.
- Respeitar arquitetura monolítica modular no backend.
- Regra de negócio não deve depender de framework.
- Infraestrutura não deve contaminar domínio.
- Controllers, adapters, providers, DTOs e detalhes de integração devem ficar nas camadas adequadas.
- Preferir composição e factories quando houver necessidade de orquestração explícita de criação.
- Evitar acoplamento desnecessário entre módulos.
- Se houver necessidade de cruzar módulos, deixar explícito o contrato e a motivação.

## Regras de backend
Antes de alterar o backend:
1. Identificar o módulo afetado.
2. Identificar se a mudança é de domínio, aplicação, interface ou infraestrutura.
3. Identificar risco para contrato HTTP, banco, cache e integrações internas.

Ao implementar:
- Não colocar regra de negócio em controller.
- Não vazar Prisma para domínio ou aplicação.
- Não usar NestJS como dependência de regra de negócio.
- Organizar casos de uso, entidades, serviços de domínio e repositórios conforme responsabilidades.
- Usar Zod quando fizer parte do fluxo de validação adotado no projeto.
- Se alterar contrato de API, considerar Swagger obrigatório.
- Se alterar persistência, considerar impacto em Prisma schema, migrations, seed e compatibilidade.
- Se alterar cache, considerar Redis, invalidação, consistência e fallback.
- Se alterar factories, preservar intenção arquitetural e previsibilidade do fluxo de criação.
- Sempre que fizer sentido, adicionar ou ajustar testes unitários com Jest.

## Regras de frontend
Antes de alterar o frontend:
1. Identificar a rota, fluxo de usuário ou contexto de tela afetado.
2. Identificar se existe contrato gerado ou consumido que será impactado.
3. Identificar se existe componente compartilhado que já resolve o problema.

Ao implementar:
- Preferir clients gerados e contratos consistentes com Orval.
- Preferir React Query para estado de servidor.
- Evitar chamadas ad hoc se já houver camada de integração padronizada.
- Validar dados com Zod quando fizer parte do fluxo existente.
- Respeitar separação entre página, componente, hook, serviço e schema.
- Reutilizar design system antes de criar UI local.
- Não duplicar comportamento visual já existente na libs/design-system.
- Manter componentes pequenos, legíveis e tipados.
- Preservar acessibilidade, semântica e previsibilidade do fluxo de navegação.

## Regras de design system
- libs/design-system é fonte de reuso e consistência.
- Antes de criar componente novo, verificar se composição de componentes existentes resolve.
- Não quebrar API pública de componente compartilhado sem explicitar impacto.
- Não acoplar componente compartilhado a uma única tela de negócio.
- Preservar padrões do shadcn e convenções já adotadas.
- Alterações em design system devem considerar impacto nos consumidores.

## Regras de contratos e integração
- Mudanças em contratos exigem atenção coordenada entre backend e frontend.
- Se alterar Swagger ou DTOs, verificar impacto em Orval e no consumo do frontend.
- Se alterar schema de resposta, payload, nomes de campos, paginação ou erros, destacar risco de regressão.
- Sempre preferir compatibilidade retroativa quando possível.
- Se não for possível, sinalizar breaking change explicitamente.

## Regras de testes e qualidade
- Toda mudança relevante deve considerar validação proporcional ao risco.
- Preferir validar no menor escopo útil.
- Rodar lint do escopo afetado.
- Rodar testes do escopo afetado.
- Rodar typecheck do escopo afetado quando aplicável.
- Rodar build apenas quando necessário.
- Em bugfix, priorizar evidência da causa raiz.
- Em refactor, preservar comportamento externo.
- Em feature, validar fluxo principal e impactos laterais.
- Em mudanças críticas, priorizar estabilidade antes de expandir escopo.

## Regras de CI/CD
- Toda alteração deve considerar impacto em CI e CD.
- Em PRs, preferir validações por escopo afetado usando NX.
- Evitar rodar pipeline global sem necessidade.
- Usar nx affected quando a alteração atingir somente parte do monorepo.
- Considerar impacto ampliado quando a mudança tocar:
  - libs compartilhadas
  - contratos
  - config do monorepo
  - Docker
  - Prisma schema
  - pipelines
  - variáveis de ambiente
- Se a mudança afetar API, considerar:
  - Swagger
  - geração/consumo via Orval
  - compatibilidade frontend/backend
- Se a mudança afetar design system, considerar apps consumidores.
- Se a mudança afetar banco, cache ou infraestrutura, explicitar risco operacional e de release.
- Sempre pensar em:
  - lint
  - test
  - typecheck
  - build
  - geração de artefatos
  - deploy afetado
  - rollback quando aplicável

## Regras de Git e operação
- Nunca fazer reset destrutivo, force push, remoção massiva, migration destrutiva, truncate ou drop sem confirmação explícita.
- Nunca alterar arquivos fora do escopo provável sem justificar.
- Sempre informar quando uma alteração pede commit separado.
- Preferir diffs pequenos e revisáveis.
- Se houver ambiguidade importante, perguntar antes de seguir.

## Regra de resposta operacional
Ao receber uma tarefa:
1. Identificar o objetivo.
2. Identificar o escopo afetado.
3. Identificar riscos.
4. Propor plano curto.
5. Implementar em etapas pequenas.
6. Validar no menor escopo útil.
7. Encerrar com:
   - arquivos alterados
   - impacto
   - validação executada
   - riscos pendentes
   - próximo passo recomendado
