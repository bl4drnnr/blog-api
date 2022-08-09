import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class ForgotPasswordDto {
  @ApiProperty({
    example: 'user@domain.com',
    description: 'Email of user'
  })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;
}
