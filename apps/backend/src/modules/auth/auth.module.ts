import { Module } from '@nestjs/common'
import { JwtModule, JwtService } from '@nestjs/jwt'
import { UsersRepository } from '@/parties/domain/repositories/users-repository'
import { PartiesModule } from '@/parties/parties.module'
import { AuthenticateUserUseCase } from './application/use-cases/authenticate-user.use-case'
import { makeAuthenticateUserUseCase } from './application/use-cases/factories/make-authenticate-user-use-case'
import { makeRefreshTokenUseCase } from './application/use-cases/factories/make-refresh-token-use-case'
import { RefreshTokenUseCase } from './application/use-cases/refresh-token.use-case'
import { AuthenticateController } from './presentation/controllers/authenticate.controller'
import { GetProfileController } from './presentation/controllers/get-profile.controller'
import { LogoutController } from './presentation/controllers/logout.controller'
import { RefreshTokenController } from './presentation/controllers/refresh-token.controller'

@Module({
  imports: [
    PartiesModule,
    JwtModule.register({
      global: true,
      secret: 'your-secret-key', // TODO: Use environment variable
      signOptions: { expiresIn: '10m' } // Token de acesso curto
    })
  ],
  controllers: [
    AuthenticateController,
    RefreshTokenController,
    GetProfileController,
    LogoutController
  ],
  providers: [
    {
      provide: AuthenticateUserUseCase,
      useFactory: (
        usersRepository: UsersRepository,
        jwtService: JwtService
      ) => {
        return makeAuthenticateUserUseCase(usersRepository, jwtService)
      },
      inject: [UsersRepository, JwtService]
    },
    {
      provide: RefreshTokenUseCase,
      useFactory: (jwtService: JwtService) => {
        return makeRefreshTokenUseCase(jwtService)
      },
      inject: [JwtService]
    }
  ]
})
export class AuthModule {}
