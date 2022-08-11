import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class DistributeRoleDto {
  @ApiProperty({
    example: 'bl4drnnr',
    description: 'Username of user'
  })
  @IsNotEmpty()
  @Length(8, 32)
  readonly username: string;

  @ApiProperty({
    example: 'ADMIN',
    description: 'Describes user role and restrict access to endpoints'
  })
  @IsNotEmpty()
  readonly value: string;
}
