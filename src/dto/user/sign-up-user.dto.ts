import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
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
  @IsString()
  @IsNotEmpty()
  @Length(8, 32)
  readonly password: string;

  @ApiProperty({ example: 'bl4drnnr', description: 'Username' })
  @IsString()
  @IsNotEmpty()
  @Length(8, 32)
  readonly username: string;

  @ApiProperty({ example: 'John', description: 'First name (optional)' })
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @MaxLength(32)
  readonly firstName?: string;

  @ApiProperty({ example: 'Doe', description: 'Last name (optional)' })
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @MaxLength(32)
  readonly lastName?: string;
}
