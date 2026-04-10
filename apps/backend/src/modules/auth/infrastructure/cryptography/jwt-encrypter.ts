import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import type { Encrypter } from '../../../auth/domain/cryptography/encrypter'

@Injectable()
export class JwtEncrypter implements Encrypter {
  constructor(private jwtService: JwtService) {}

  encrypt(
    payload: Record<string, unknown>,
    options?: Record<string, unknown>
  ): Promise<string> {
    return this.jwtService.signAsync(payload, options)
  }
}
