import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  Length,
  MaxLength
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SignUpUserDto {
  @ApiProperty({ example: 'user@domain.com', description: 'User email' })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({
    example: '1@qWasdf',
    description: 'User password as pure string'
  })
  @IsNotEmpty()
  @Length(8, 32)
  readonly password: string;

  @ApiProperty({ example: 'bl4drnnr', description: 'Username' })
  @IsNotEmpty()
  @Length(8, 32)
  readonly username: string;

  @ApiProperty({ example: 'John', description: 'First name (optional)' })
  @ApiPropertyOptional()
  @IsOptional()
  @MaxLength(32)
  readonly firstName?: string;

  @ApiProperty({ example: 'Doe', description: 'Last name (optional)' })
  @ApiPropertyOptional()
  @IsOptional()
  @MaxLength(32)
  readonly lastName?: string;
}
