# Progresso da Implementação: Módulo de Configurações do Sistema

Este documento resume o que foi realizado até o momento e os próximos passos para a conclusão do módulo de configurações.

## ✅ O que já foi feito

### 1. Backend (Módulo System Settings)
- **Banco de Dados**: Criada entidade `SystemSetting` no Prisma (Tabela `system_settings`) com suporte a chave-valor, tipos e agrupamento.
- **Arquitetura**: Implementado seguindo Clean Architecture e Modular Monolith.
- **Domínio**: Criada entidade de domínio com **Factory Pattern** (`create` e `restore`) e regras de negócio.
- **Aplicação (Use Cases)**:
  - `SaveSystemSettingUseCase`: Gerencia gravação/atualização (Upsert).
  - `FetchSettingsByGroupUseCase`: Busca configurações por grupo principal.
- **Infraestrutura**: Repositório Prisma implementado.
- **Apresentação**: Controller REST e DTOs documentados com Swagger.
- **Integração**: Módulo injetado no `AppModule`.

### 2. UI Kit (@aoponto/ui-kit)
- **Checkbox**: Componente premium criado para seleções booleanas.
- **Select**: Componente premium (wrapper nativo) para seleções de lista.
- Ambos exportados e prontos para uso em todo o monorepo.

### 3. Frontend Web (Configurações)
- **Modal Principal**: Refatorada navegação interna para suportar sub-telas ("Gereciamento de Views").
- **Tela Geral**: Criada interface para dados da assinatura e configurações operacionais.
- **Tela Minhas Definições**: Criada interface completa com mais de 20 opções divididas em seções (Pedidos, Delivery, Estoque, Permissões).
- **Layout**: Implementado design "Fit-to-Modal" em grid de 2 colunas para evitar scroll excessivo.

## 🚀 Próximos Passos (To-Do)

- [ ] **Sincronização Orval**: Rodar `nx orval` para gerar os hooks do React Query para o novo controller de `system-settings`.
- [ ] **Integração Real**: Substituir os estados locais do modal e os dados mockados (como a assinatura) por chamadas à API real.
- [ ] **Persistência Individual**: Garantir que cada checkbox nas "Minhas Definições" salve seu estado de forma independente no banco via Upsert.
- [ ] **Novas Telas**: Implementar os ajustes restantes da grade:
  - Ajustes do Cupom (Cabeçalho/Rodapé/Cozinha).
  - Imagem de Fundo.
  - Áreas de Entrega.
  - Origem de Clientes.
  - Balanças (Cód de Barras por KG).
- [ ] **Deploy**: Rodar `npx prisma db push` para aplicar a nova tabela em ambiente de homologação/produção.

---
*Atualizado em: 06 de Abril de 2026*
