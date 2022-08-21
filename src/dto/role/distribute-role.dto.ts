import { IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DistributeRoleDto {
  @ApiProperty({ example: 'bl4drnnr', description: 'Username' })
  @IsString()
  @IsNotEmpty()
  @Length(8, 32)
  readonly username: string;

  @ApiProperty({ example: 'ADMIN', description: 'Role name' })
  @IsString()
  @IsNotEmpty()
  readonly value: string;
}
