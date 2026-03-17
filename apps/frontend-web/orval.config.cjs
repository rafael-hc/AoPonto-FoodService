module.exports = {
  'food-service': {
    input: 'http://localhost:3000/docs-json', // Usando porta atualizada🛸⚡
    output: {
      mode: 'tags-split',
      target: 'app/api/generated/api.ts',
      schemas: 'app/api/generated/model',
      client: 'react-query',
      httpClient: 'axios',
      override: {
        mutator: {
          path: './app/lib/api.ts',
          name: 'api'
        }
      }
    }
  }
}
