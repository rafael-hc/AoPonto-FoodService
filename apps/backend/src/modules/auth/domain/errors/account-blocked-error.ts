import { UnauthorizedException } from '@nestjs/common'

export class AccountBlockedError extends UnauthorizedException {
  constructor(lockUntil?: Date | null) {
    const message = lockUntil
      ? `Sua conta está bloqueada por excesso de tentativas. Tente novamente após ${lockUntil.toLocaleTimeString('pt-BR')}`
      : 'Sua conta está bloqueada.'

    super({
      message,
      error: 'AccountBlocked',
      lockUntil: lockUntil?.toISOString()
    })
  }
}
