import { ApiProperty } from '@nestjs/swagger';

export class BanUserDto {
  @ApiProperty({
    example: 'user@domain.com',
    description: 'Email of user'
  })
  email: string;

  @ApiProperty({
    example: 'Hacker',
    description: 'Reason of ban'
  })
  readonly reason: string;
}
