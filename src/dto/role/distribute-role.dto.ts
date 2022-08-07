import { ApiProperty } from '@nestjs/swagger';

export class DistributeRoleDto {
  @ApiProperty({
    example: 'bl4drnnr',
    description: 'Username of user'
  })
  readonly username: string;

  @ApiProperty({
    example: 'ADMIN',
    description: 'Role for this user'
  })
  readonly value: string;
}
