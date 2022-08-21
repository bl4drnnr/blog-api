import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RoleDto {
  @ApiProperty({ example: 'ADMIN', description: 'Role name' })
  @IsString()
  @IsNotEmpty()
  readonly value: string;

  @ApiProperty({ example: 'Administrator', description: 'Role description' })
  @IsString()
  @IsNotEmpty()
  readonly description: string;
}
