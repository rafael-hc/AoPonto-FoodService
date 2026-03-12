---
trigger: always_on
---

Aprendizados e Regras de Desenvolvimento (AoPonto)
Este documento consolida as boas práticas e padrões arquiteturais estabelecidos durante o desenvolvimento do projeto AoPonto.

1. Arquitetura de Componentes UI (Compound Pattern)
Padrão Composto: Componentes complexos (como Dialog, Sidebar, Topbar) devem ser divididos em sub-partes (Root, Content, Header, Footer). Isso aumenta a flexibilidade e evita a "explosão de props".
Storybook Autodocs: Todo componente no ui-kit deve usar a tag tags: ['autodocs'] e ter argTypes claros para controles estáveis de estado.
2. 🖱️ Comportamento e UX (Regras Estritas)
Static Backdrop em Modais: Modais de ação (ex: cadastros) não devem fechar ao clicar fora (no overlay). O fechamento deve ocorrer apenas por interação com botões específicos ("Cancelar", "Voltar", "X").
Máscaras de Input: Dados sensíveis ao formato (CPF, CNPJ, CEP) devem ter máscaras em tempo real no frontend, mas serem enviados "limpos" (apenas dígitos) para a API.
3. Backend e Domínio (Clean Architecture)
Desacoplamento Técnico: A lógica de negócio reside nas entidades e casos de uso de domínio. O banco de dados e frameworks são detalhes de infraestrutura.
Repositórios In-Memory: Sempre criar versões InMemory dos repositórios para testes de unidade rápidos e independentes de infraestrutura.
Fail Fast (Zod): Validação rigorosa na camada de entrada (DTOs) usando Zod para impedir que dados inválidos cheguem ao domínio.
4. Integração e Tipagem (Contract-First)
Single Source of Truth: O backend é a fonte da verdade. Alterações de regras de negócio fluem do DTO para o OpenAPI/Swagger.
Automação Orval: O frontend deve sincronizar tipos e hooks do React Query automaticamente via terminal (nx orval) a partir do endpoint do backend.
5. Estética e Design System
Paleta Premium: Uso rigoroso do tema Orange/Slate. Evite cores genéricas (red, blue) sem as nuances do sistema de design.
Feedback Visual: Interações devem ter estados claros de hover, active e loading.
6. Workflow e Git
Commits por Contexto: Agrupar mudanças relacionadas por funcionalidade (ex: feat(ui-kit), test(backend)) para um histórico legível.
Verificação Contínua: Validar builds e lints de todo o monorepo antes de finalizar tarefas importantes.
