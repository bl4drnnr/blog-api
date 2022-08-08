import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class SignInUserDto {
  @ApiProperty({
    example: 'user@domain.com',
    description: 'Email of user'
  })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({
    example: '1@qWasdf',
    description: 'Password of user'
  })
  @IsNotEmpty()
  @Length(8, 32)
  readonly password: string;
}
