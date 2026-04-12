# Planejamento: Implementação do Sistema de Wizard (Perguntas e Complementos)

Este documento descreve as fases de implementação para o sistema de perguntas e adicionais, permitindo a configuração de combos e itens recursivos.

## Histórico de Versões
- **v1.0.0**: Planejamento inicial dividido em fases.
- **v1.1.0**: Backend (Fase 1) concluído com CRUD completo e vínculo de produtos.
- **v1.2.0**: Frontend (Fase 2) concluído com Data Table e Modal de Gestão Global.

---

## 🏗️ Fase 1: Infraestrutura e Backend (Concluída) ✅
**Objetivo**: Criar a base de dados robusta e os serviços de gerenciamento das perguntas.

- [x] **Banco de Dados (Prisma)**:
    - [x] **WizardQuestion**: Estrutura global para o banco de perguntas.
    - [x] **WizardOption**: Itens selecionáveis vinculados a `ProductDetail`.
    - [x] **ProductWizard**: Tabela pivot para vínculo e ordenação em produtos.
    - [x] **Migrações**: Aplicadas com sucesso no PostgreSQL.

- [x] **Domínio (Clean Architecture)**:
    - [x] **Entidades**: Lógica de validação de limites (min/max) e regras de negócio.
    - [x] **Mapeadores**: Conversão bidirecional entre Prisma e Domínio.
    - [x] **Repositórios (Interfaces)**: Definição clara dos contratos de persistência.
    - [x] **Testes Unitários**: 100% de cobertura nos métodos de validação das entidades.

- [x] **Casos de Uso (Application)**:
    - [x] `SynchronizeWizardQuestion`: Lógica atômica de criação/edição.
    - [x] `ListWizardQuestions`: Listagem páginada com busca global.
    - [x] `GetWizardQuestion`: Recuperação de detalhes para edição.
    - [x] `DeleteWizardQuestion`: Exclusão lógica (soft delete).
    - [x] `SyncProductWizards`: Gestão de vínculos entre perguntas e produtos.
    - [x] **Testes Unitários**: Validação dos fluxos de orquestração com Repositórios InMemory.

- [x] **API e Documentação (Presentation)**:
    - [x] **Controllers**: Endpoints RESTful para todas as operações de CRUD e Vínculo.
    - [x] **DTOs (Zod)**: Validação rigorosa de entrada e saída usando `nestjs-zod`.
    - [x] **Swagger**: Documentação OpenAPI completa e tipada.
    - [x] **DI**: Registro de todas as dependências no `CatalogModule`.

---

## 🖥️ Fase 2: Gestão de Banco de Perguntas (Concluída) ✅
**Objetivo**: Dashboard administrativo para manter o repositório de perguntas.

- [x] **Integração de Contratos (API)**:
    - [x] Sincronização de hooks via Orval e correção de mapeamentos de tipos.
- [x] **Navegação e Rotas**:
    - [x] Rota `/perguntas` registrada e acessível.
    - [x] **Formulário de Edição (WizardQuestionModal)**:
        - [x] Componente premium com Compound Pattern.
        - [x] Gestão de opções com busca dinâmica de produtos.
        - [x] Validação rigorosa de limites e regras de negócio.
    - [x] **Integração**:
        - [x] Persistência via `Sync` e atualização automática da tabela (`refetch`).

---

## 🔗 Fase 3: Vínculo com Produtos (Frontend & Integração)
**Objetivo**: Integrar o banco de perguntas na experiência de cadastro de produtos.

- [ ] **Infraestrutura de Consulta (Backend)**:
    - [ ] Criar `FetchProductWizardsUseCase` para retornar os vínculos atuais de um produto.
    - [ ] Expor o endpoint `GET /api/product-wizards/:productId`.
- [ ] **Integração no `ProductModal.tsx`**:
    - [ ] Adicionar aba "Wizard" (visível apenas em modo de edição).
    - [ ] Integrar o componente `WizardLinker`.
- [ ] **Componente `WizardLinker`**:
    - [ ] **Seleção**: Listar perguntas globais com checkboxes.
    - [ ] **Ordenação**: Interface para definir a sequência de exibição (ex: botões Up/Down).
    - [ ] **Preview**: Mostrar brevemente as opções da pergunta ao selecionar.
- [ ] **Persistência**:
    - [x] Integrar o hook `useProductWizardsLinkageControllerSync`.
    - [x] Garantir que o `id` do produto seja passado corretamente.
- [ ] **Qualidade e Testes (Factories Pattern)**:
    - [ ] Criar diretório `src/modules/catalog/test/factories`.
    - [ ] Implementar `make-product-wizard.ts` e `make-wizard-question.ts`.
    - [ ] Refatorar testes unitários para utilizar as novas factories.

---

## 🚀 Implementações Futuras (Aguardando Módulo de Pedidos)
**Objetivo**: Implementar a lógica de consumo do Wizard durante a venda, quando o módulo de pedidos estiver disponível.

- [ ] **Modal de Seleção (UX Premium)**:
    - Exibição de uma pergunta por vez (Stepper) ou conforme a ordem definida.
    - Feedback em tempo real: "Faltam X itens para completar o mínimo".
- [ ] **Lógica de Recursividade**:
    - Ao selecionar uma opção, o sistema verifica se aquele `productDetailId` possui seu próprio Wizard (`ProductWizard`). No sucesso, "empilha" uma nova etapa de perguntas.
- [ ] **Integração com Carrinho**:
    - O item no carrinho deve carregar a estrutura de `selectedOptions`.
    - O preço total do item será calculado recursivamente: `Unidade Base + Somatória(Opção.promoPrice * Opção.qty)`.
- [ ] **Persistência do Pedido**:
    - Garantir que a estrutura de "Wizard Choice" seja salva de forma que a cozinha (impressão/monitor) entenda a hierarquia (ex: Combo X -> Burger Y -> Sem Cebola).

---

## 📝 Regras de Validação Estritas
1. **Obrigatoriedade**: O botão "Adicionar ao Carrinho" fica desabilitado se qualquer pergunta com `minItems > 0` não for satisfeita.
2. **Conflito de Preços**: Se `promoPrice` for nulo, usa-se o `salePrice` padrão do detalhe.
3. **Estoque**: A seleção de uma opção deve validar a disponibilidade de estoque do `ProductDetail` vinculado.

---

## 📝 Regras de Negócio Consolidadas
1. **Precificação**: O `promoPrice` da opção sempre sobressai ao preço original do `ProductDetail`.
2. **Obrigatoriedade**: Se `minResponses > 0` ou `minItems > 0`, a pergunta é travada até ser respondida.
3. **Escopo**: Perguntas pertencem a um banco global; os produtos apenas as "consomem" via ordenação específica.
4. **ID**: Usar UUID para identificação única e Código Inteiro para performance/ordenação.

## Fase 4: Contexto e Filtragem Inteligente (Em Execução)

Esta fase adiciona inteligência ao cadastro de perguntas, permitindo que o sistema filtre os itens disponíveis com base na natureza da pergunta (Produto vs Combo).

### Mudanças Propostas:
- **Banco de Dados**: Novo campo `context` (String) no modelo `WizardQuestion`.
- **Domínio**: Suporte a contextos `PRODUCT` e `COMBO`.
- **Backend**: Persistência do contexto no `SynchronizeWizardQuestionUseCase`.
- **Frontend**: 
  - Toggle de seleção no `WizardQuestionModal`.
  - Filtro dinâmico na barra de busca (Pergunta de Produto -> Complementos | Pergunta de Combo -> Produtos).

### Regra de Negócio:
- **ID de Complementos**: `b0dff670-38ad-4917-8952-1314a6e0d7cb` (Hardcoded conforme `ComplementsController`).
- **Filtro**:
  - `PRODUCT`: Exibe itens com `productTypeId === COMPLEMENT_ID`.
  - `COMBO`: Exibe itens com `productTypeId !== COMPLEMENT_ID`.
