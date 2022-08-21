import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInUserDto {
  @ApiProperty({ example: 'user@domain.com', description: 'User email' })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({
    example: '1@qWasdf',
    description: 'User password as pure string'
  })
  @IsString()
  @IsNotEmpty()
  @Length(8, 32)
  readonly password: string;
}
