import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
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
}
