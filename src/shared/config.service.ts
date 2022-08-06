import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';
import { isNil } from 'lodash';

@Injectable()
export class ConfigService {
  constructor(private nestConfigService: NestConfigService) {}

  private get(key: string): string {
    const value = this.nestConfigService.get<string>(key);

    if (isNil(value)) throw new Error('environment variable does not set');

    return value;
  }

  private getNumber(key: string): number {
    const value = this.get(key);

    try {
      return Number(JSON.parse(value));
    } catch {
      throw new Error('environment variable does not set');
    }
  }

  private getBoolean(key: string): boolean {
    const value = this.get(key);

    try {
      return Boolean(JSON.parse(value));
    } catch {
      throw new Error('environment variable does not set');
    }
  }

  private getString(key: string): string {
    const value = this.get(key);

    return value.trim();
  }

  get jwtAuthConfig() {
    return {
      expirationInSeconds: this.getNumber('JWT_EXPIRES_IN'),
      publicKey: this.getString('JWT_PUBLIC_KEY'),
      privateKey: this.getString('JWT_PRIVATE_KEY')
    };
  }
}
