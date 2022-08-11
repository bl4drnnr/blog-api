import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class RefreshTokenDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'User id for refresh token'
  })
  @IsUUID(4)
  readonly userId: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Refresh token id'
  })
  @IsUUID(4)
  readonly tokenId: string;
}
