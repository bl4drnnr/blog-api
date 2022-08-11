import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../../models/role.model';
import { IsUUID } from 'class-validator';

export class AccessTokenDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'User id used for token payload'
  })
  @IsUUID(4)
  readonly userId: string;

  @ApiProperty({
    example: 'bl4drnnr',
    description: 'Username used for token payload'
  })
  readonly username: string;

  @ApiProperty({
    example: "['ADMIN', 'USER']",
    description: 'List of user roles'
  })
  readonly roles: Role[];
}
