# Regras de Navegação e SubNavigation

Quando ocorrer interações com os botões do componente `apps/frontend-web/app/components/layout/SubNavigation.tsx`, as seguintes regras arquiteturais e de comportamento devem ser rigorosamente aplicadas:

1. **Tipos de Abertura de Tela**:
   A princípio, teremos dois modos principais de renderização ao clicar nas ações (ActionTiles) da SubNavigation:
   - **Telas de Rota (Outlet)**: São as telas padrão que substituem o conteúdo principal e são renderizadas dentro do `<Outlet />` do `MainLayout` (ex: Painel Principal, Lista de Clientes).
   - **Telas Modais (Overlay)**: São janelas sobrepostas à tela atual, ideais para formulários ou interações focadas (ex: "Abrir / Fechar Caixa", "Novo Pedido").

2. **Comportamento Estrito de Modais**:
   - Qualquer modal aberto através de uma ação do `SubNavigation` **NÃO DEVE fechar ao clicar fora dele** (no backdrop/overlay).
   - O modal deve ser "obrigatório" (static backdrop) e **só fechará mediante interação com botões específicos dentro do próprio modal** (ex: botão "Cancelar", "Voltar" ou após concluir a ação com "Salvar").
   - O objetivo desta regra é evitar que o usuário perca dados preenchidos ao clicar acidentalmente fora da janela flutuante.
