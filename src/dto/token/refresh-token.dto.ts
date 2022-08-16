import { IsUUID } from 'class-validator';

export class RefreshTokenDto {
  @IsUUID(4)
  readonly userId: string;

  @IsUUID(4)
  readonly tokenId: string;
}
