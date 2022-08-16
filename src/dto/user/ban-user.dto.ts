import { IsEmail, IsNotEmpty } from 'class-validator';

export class BanUserDto {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  readonly reason: string;
}
