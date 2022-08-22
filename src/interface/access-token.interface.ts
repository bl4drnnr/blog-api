import { Role } from '@models/role.model';

export class IAccessToken {
  readonly userId: string;
  readonly username: string;

  readonly roles: Role[];
}
