import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RoleDto {
  @ApiProperty({ example: 'ADMIN', description: 'Role name' })
  @IsNotEmpty()
  readonly value: string;

  @ApiProperty({ example: 'Administrator', description: 'Role description' })
  @IsNotEmpty()
  readonly description: string;
}
