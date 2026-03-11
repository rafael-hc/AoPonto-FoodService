#!/bin/bash

# 1. Pega os modelos que foram alterados via git diff
# Procura por linhas que começam com "model" ou "enum" que foram adicionadas/modificadas
CHANGES=$(git diff schema.prisma | grep -E "^\+model|^\+  [a-zA-Z]" | grep -oE "model [a-zA-Z]+" | awk '{print $2}' | paste -sd "_" -)

# 2. Se não houver mudanças detectadas pelo git, usa um timestamp
if [ -z "$CHANGES" ]; then
    MIGRATE_NAME="update_$(date +%H%M)"
else
    MIGRATE_NAME="modify_${CHANGES}_$(date +%H%M)"
fi

echo "🚀 Alterações detectadas em: $CHANGES"
echo "📝 Gerando migrate com nome: $MIGRATE_NAME"

# 3. Executa o migrate do prisma
npx prisma migrate dev --name "$MIGRATE_NAME"
