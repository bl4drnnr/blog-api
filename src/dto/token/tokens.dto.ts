import { ApiProperty } from '@nestjs/swagger';

export class TokensDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'User id for refresh token'
  })
  readonly _at: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Refresh token id'
  })
  readonly _rt: string;
}
