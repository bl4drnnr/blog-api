import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BanUserDto {
  @ApiProperty({ example: 'user@domain.com', description: 'User email' })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({ example: 'Hacker', description: 'Reason for ban' })
  @IsString()
  @IsNotEmpty()
  readonly reason: string;
}
