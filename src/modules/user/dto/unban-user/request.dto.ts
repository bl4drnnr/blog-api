import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class UnbanUserDto {
  @ApiProperty({ example: 'user@domain.com', description: 'User email' })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;
}
