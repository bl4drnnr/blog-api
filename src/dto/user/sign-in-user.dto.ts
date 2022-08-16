import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class SignInUserDto {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  @Length(8, 32)
  readonly password: string;
}
