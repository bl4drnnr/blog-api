import { ApiProperty } from "@nestjs/swagger";

export class AccessTokenDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'User id used for token payload'
  })
  readonly userId: string;

  @ApiProperty({
    example: 'bl4drnnr',
    description: 'Username used for token payload'
  })
  readonly username: string;
}
