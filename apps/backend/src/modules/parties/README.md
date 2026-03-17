# Documentação de Requisitos - PartiesModule (AoPonto)

**Visão Geral:** O módulo `Parties` atua como o diretório central de *Stakeholders* do ecossistema AoPonto. Ele é responsável por gerenciar os dados de negócio e contatos de Clientes, Colaboradores e Fornecedores, operando de forma 100% isolada da lógica de autenticação e credenciais (que reside no `AuthModule`).

---

## 1. Casos de Uso (Application Layer)

### 1.1. Clientes (Customers)
- **RegisterCustomerUseCase:** Cria um cliente básico (nome, telefone) via Totem ou balcão.
- **CompleteCustomerProfileUseCase:** Adiciona CPF, e-mail e data de nascimento (geralmente via app/delivery).
- **UpdateCustomerAddressUseCase:** Adiciona ou edita endereços de entrega (com validação de raio de entrega futuramente).
- **MergeDuplicateCustomersUseCase:** Unifica dois cadastros se o cliente criou um no Totem e outro no Delivery.
- **AddCustomerLoyaltyPointsUseCase:** Incrementa pontos no programa de fidelidade após uma compra.
- **RedeemCustomerLoyaltyPointsUseCase:** Subtrai pontos e gera um voucher/desconto.
- **SetCustomerCreditLimitUseCase:** Define um limite financeiro para clientes de confiança (controle de "fiado").
- **AnonymizeCustomerDataUseCase:** Anonimiza os dados pessoais do cliente para conformidade com a LGPD, mantendo o histórico de vendas intacto.

### 1.2. Colaboradores (Employees)
- **RegisterEmployeeUseCase:** Cadastra um funcionário com CPF obrigatório, data de admissão e cargo.
- **UpdateEmployeeRoleUseCase:** Promove ou altera o cargo de um funcionário (ex: de Garçom para Gerente).
- **UpdateEmployeeCommissionRateUseCase:** Define ou altera a porcentagem de comissão/taxa de serviço.
- **DeactivateEmployeeUseCase:** Inativa o funcionário (demissão/desligamento) via *soft delete*.
- **ReactivateEmployeeUseCase:** Reativa um funcionário que retornou à operação.
- **FetchActiveEmployeesByRoleUseCase:** Lista colaboradores disponíveis (ex: buscar todos os entregadores ativos para roteirização).

### 1.3. Fornecedores (Suppliers)
- **RegisterSupplierUseCase:** Cadastra um fornecedor com CNPJ, Razão Social e Inscrição Estadual.
- **UpdateSupplierContactsUseCase:** Atualiza os dados do representante comercial (nome, telefone, e-mail de faturamento).
- **UpdateSupplierPaymentTermsUseCase:** Define os prazos negociados (ex: 30/60/90 dias).
- **DeactivateSupplierUseCase:** Inativa um fornecedor que não atende mais o restaurante.

### 1.4. Gerais e Buscas (Queries)
- **FetchPartyByDocumentUseCase:** Busca universal por CPF/CNPJ (essencial para emitir NFC-e/NF-e no caixa).
- **FetchPartyByPhoneUseCase:** Busca rápida pelo telefone (clássico em telas de atendimento de delivery).

---

## 2. Requisitos Funcionais (RFs)

- **RF01:** O sistema não deve permitir o cadastro de dois *Stakeholders* (`Parties`) com o mesmo documento (CPF ou CNPJ) ativo.
- **RF02:** O sistema deve validar matematicamente se o CPF ou CNPJ fornecido é válido no momento do cadastro ou atualização.
- **RF03:** Clientes podem ter múltiplos endereços cadastrados, mas apenas um pode ser definido como "Endereço Principal".
- **RF04:** Um funcionário só pode executar funções no sistema (vincular ao `AuthModule`) se o seu status no `PartiesModule` for "Ativo".
- **RF05:** Clientes que realizam compras no balcão ou Totem podem ser cadastrados apenas com o Nome, sendo o Telefone e o CPF atributos opcionais para a criação inicial.
- **RF06:** Funcionários e Fornecedores devem obrigatoriamente possuir um Documento (CPF ou CNPJ) atrelado ao cadastro.
- **RF07:** O sistema deve registrar o histórico de acúmulo e resgate de pontos de fidelidade do cliente, impedindo resgates que deixem o saldo negativo.
- **RF08:** O sistema deve suportar a categorização de Colaboradores em papéis base predefinidos (ex: Gerente, Caixa, Garçom, Entregador, Cozinha).

---

## 3. Requisitos Não Funcionais (RNFs)

- **RNF01 (Integridade de Dados):** O sistema deve utilizar *Soft Delete* (deleção lógica) para qualquer `Party`. Nenhuma pessoa ou empresa deve ser apagada fisicamente do banco de dados, preservando a integridade referencial de pedidos antigos e relatórios financeiros.
- **RNF02 (Performance de Busca):** A busca de clientes por número de telefone ou CPF deve ser indexada no banco de dados (PostgreSQL) para garantir tempo de resposta inferior a 50ms.
- **RNF03 (Conformidade Legal / LGPD):** O módulo deve possuir rotinas automatizadas para exportar os dados de um cliente em formato estruturado (JSON/CSV) e anonimizá-los de forma irreversível caso o cliente solicite a exclusão de sua conta.
- **RNF04 (Desacoplamento e Coesão):** O `PartiesModule` não deve possuir nenhuma dependência de bibliotecas de criptografia de senhas (bcrypt/argon2) ou geradores de tokens (JWT).
- **RNF05 (Auditoria):** Alterações críticas em perfis de colaboradores (como mudança de cargo, status ou taxa de comissão) devem gerar logs auditáveis contendo identificador do autor, timestamp e o valor (antigo/novo).
- **RNF06 (Concorrência):** Atualizações no saldo de fidelidade (`loyaltyPoints`) devem utilizar transações atômicas no banco de dados para evitar *race conditions* em compras simultâneas.
