import { ApiProperty } from '@nestjs/swagger';

export class RoleDto {
  @ApiProperty({
    example: 'ADMIN',
    description: 'Describes user role and restrict access to endpoints'
  })
  readonly value: string;

  @ApiProperty({
    example: 'Administrator',
    description: 'Description of the role'
  })
  readonly description: string;
}
