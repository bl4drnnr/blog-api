import { Role } from '../../models/role.model';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AccessTokenDto {
  @ApiProperty({
    example: 'dbf53edc-7a8c-4ec5-9675-df06fd5e8171',
    description: 'Unique id of user'
  })
  @IsUUID(4)
  readonly userId: string;

  @ApiProperty({ example: 'bl4drnnr', description: 'Username' })
  @IsNotEmpty()
  readonly username: string;

  readonly roles: Role[];
}
