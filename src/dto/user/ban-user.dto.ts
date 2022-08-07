import { ApiProperty } from '@nestjs/swagger';

export class BanUserDto {
  @ApiProperty({
    example: 'Hacker',
    description: 'Reason of ban'
  })
  readonly reason: string;
}
