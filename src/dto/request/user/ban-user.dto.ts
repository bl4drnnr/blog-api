import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class BanUserDto {
  @ApiProperty({
    example: 'user@domain.com',
    description: 'Email of user'
  })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({
    example: 'Hacker',
    description: 'Reason of ban'
  })
  @IsNotEmpty()
  readonly reason: string;
}
