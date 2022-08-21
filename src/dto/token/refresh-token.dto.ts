import { IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenDto {
  @ApiProperty({
    example: 'dbf53edc-7a8c-4ec5-9675-df06fd5e8171',
    description: 'Unique id of user'
  })
  @IsNotEmpty()
  @IsUUID(4)
  readonly userId: string;

  @ApiProperty({
    example: 'dbf53edc-7a8c-4ec5-9675-df06fd5e8171',
    description: 'Unique id of refresh token'
  })
  @IsNotEmpty()
  @IsUUID(4)
  readonly tokenId: string;
}
