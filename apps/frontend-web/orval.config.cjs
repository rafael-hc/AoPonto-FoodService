module.exports = {
  'food-service': {
    input: '../../swagger.json',
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
        },
        components: {
          schemas: {
            // Unificar todos os enums de Role para um único tipo
            UserResponseDtoRole: {
              name: 'UserRole'
            },
            RegisterUserDtoRole: {
              name: 'UserRole'
            },
            UpdateUserDtoRole: {
              name: 'UserRole'
            },
            GetProfileResponseDtoUserRole: {
              name: 'UserRole'
            },
            UserResponseDtoUsersItemRole: {
              name: 'UserRole'
            }
          }
        }
      }
    }
  }
}
