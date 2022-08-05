import { ApiProperty } from '@nestjs/swagger';

export class SignUpUserDto {
  @ApiProperty({
    example: 'user@domain.com',
    description: 'Email of user'
  })
  readonly email: string;

  @ApiProperty({
    example: '1@qWasdf',
    description: 'Password of user'
  })
  readonly password: string;

  @ApiProperty({
    example: 'bl4drnnr',
    description: 'Username of user'
  })
  readonly username: string;

  @ApiProperty({
    example: 'John',
    description: 'First name (optional)'
  })
  readonly firstName: string;

  @ApiProperty({
    example: 'Doe',
    description: 'Last name of user (optional)'
  })
  readonly lastName: string;
}
