import { Role } from '../../models/role.model';
import { IsUUID } from 'class-validator';

export class AccessTokenDto {
  @IsUUID(4)
  readonly userId: string;

  readonly username: string;

  readonly roles: Role[];
}
