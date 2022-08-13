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
      accessExpiresIn: this.getString('JWT_ACCESS_EXPIRES_IN'),
      refreshExpiresIn: this.getString('JWT_REFRESH_EXPIRES_IN'),
      secret: this.getString('JWT_SECRET')
    };
  }

  get administratorEmail() {
    return this.getString('ADMIN_EMAIL');
  }
}
