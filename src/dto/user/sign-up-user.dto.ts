import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  Length,
  MaxLength
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpUserDto {
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

  @ApiProperty({
    example: 'bl4drnnr',
    description: 'Username of user'
  })
  @IsNotEmpty()
  @Length(8, 32)
  readonly username: string;

  @ApiProperty({
    example: 'John',
    description: 'First name (optional)'
  })
  @IsOptional()
  @MaxLength(32)
  readonly firstName?: string;

  @ApiProperty({
    example: 'Doe',
    description: 'Last name of user (optional)'
  })
  @IsOptional()
  @MaxLength(32)
  readonly lastName?: string;
}
