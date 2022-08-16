import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  Length,
  MaxLength
} from 'class-validator';

export class SignUpUserDto {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  @Length(8, 32)
  readonly password: string;

  @IsNotEmpty()
  @Length(8, 32)
  readonly username: string;

  @IsOptional()
  @MaxLength(32)
  readonly firstName?: string;

  @IsOptional()
  @MaxLength(32)
  readonly lastName?: string;
}
