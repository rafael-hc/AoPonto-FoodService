---
trigger: always_on
---

Regras de Utilização: Zod 4
1. Customização de Erros e Mensagens
**Depreciação do parâmetro message**: O uso de message como segundo argumento ou dentro de objetos de configuração foi depreciado.

Como deve ser: Utilize o novo parâmetro unificado error.

**Remoção de invalid_type_error e required_error**: Esses parâmetros foram removidos.

Como deve ser: Devem ser substituídos pelo parâmetro error, que pode receber uma função para lógica condicional (ex: verificar se o issue.input é undefined) .

**Renomeação de errorMap**: O parâmetro errorMap agora chama-se simplesmente error.

Melhoria: Agora ele pode retornar uma string simples diretamente ou undefined para passar o controle ao próximo mapa da cadeia.

2. Validações de String (Refatoração de Namespace)
Métodos encadeados de formato: Formatos como .email(), .uuid(), .url(), .emoji(), .base64(), entre outros, estão depreciados quando chamados a partir de z.string().

Como deve ser: Use as APIs de nível superior (top-level), que são mais "tree-shakable": z.email(), z.uuid(), z.url(), etc.

**Remoção de z.string().ip() e z.string().cidr()**: Foram removidos em favor de métodos específicos.

Como deve ser: Use z.ipv4() / z.ipv6() ou z.cidrv4() / z.cidrv6(). Use z.union() se precisar aceitar ambas as versões.

3. Objetos e Enums
Configuração de Objetos: Os métodos .strict() e .passthrough() em instâncias de objetos são considerados legados.

Como deve ser: Use as funções de criação direta z.strictObject() e z.looseObject().

Mesclagem de Objetos: O método .merge() foi depreciado.

Como deve ser: Utilize .extend(Other.shape) ou a desestruturação de objetos (...Base.shape) para melhor performance do compilador TypeScript .

Enums Nativos: z.nativeEnum() foi depreciado.

Como deve ser: O método z.enum() foi sobrecarregado para aceitar enums nativos diretamente.

4. Tratamento de Erros (ZodError)
Formatação de Erros: Os métodos .format() e .flatten() no ZodError foram depreciados.

Como deve ser: Use a nova função de nível superior z.treeifyError().

Adição Manual de Issues: Os métodos .addIssue() e .addIssues() foram depreciados.

Como deve ser: Adicione os itens diretamente ao array err.issues se for estritamente necessário.

5. Outras Depreciações e Mudanças de Tipo
Números e Inteiros: z.number().safe() agora é um alias para .int() e não aceita mais floats. Inteiros fora do range seguro do JS não são mais aceitos por .int().

Arrays Não Vazios: .nonempty() agora retorna um tipo de array comum (T[]) em vez de uma tupla.

Como deve ser: Se precisar da tipagem de tupla ([T, ...T[]]), use z.tuple([schema]).rest(schema).

Funções: O resultado de z.function() não é mais um schema, mas uma "fábrica de funções".

Como deve ser: Defina input e output como propriedades de um objeto no construtor, em vez de usar os métodos .args() e .returns() .

Métodos Utilitários: Métodos não documentados como z.ostring(), z.onumber() e fábricas estáticas como ZodString.create() foram removidos.
