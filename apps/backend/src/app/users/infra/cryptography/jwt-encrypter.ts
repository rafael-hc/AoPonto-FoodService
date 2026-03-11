import { JwtService } from '@nestjs/jwt';
import { Encrypter } from '../../domain/cryptography/encrypter';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtEncrypter implements Encrypter {
  constructor(private jwtService: JwtService) {}

  encrypt(
    payload: Record<string, unknown>,
    options?: Record<string, unknown>,
  ): Promise<string> {
    return this.jwtService.signAsync(payload, options);
  }
}
