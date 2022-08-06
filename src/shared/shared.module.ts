import { Global, Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Global()
@Module({
  providers: [ConfigService, NestConfigService],
  exports: [ConfigService]
})
export class SharedModule {}
