import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { AuthService } from '../entities/auth/auth.service';
import { Observable } from 'rxjs';
import { TokenError, TokenPayload } from '../interface/token-payload.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;
    if (!authHeader)
      throw new UnauthorizedException({ message: 'unauthorized' });

    const bearer = authHeader.split(' ')[0];
    const token = authHeader.split(' ')[1];

    if (bearer !== 'Bearer' || !token)
      throw new UnauthorizedException({ message: 'unauthorized' });

    const payload: TokenPayload | TokenError =
      this.authService.verifyToken(token);

    if (!('type' in payload))
      throw new UnauthorizedException({ message: 'unauthorized' });

    req.user = payload.userId;
    return true;
  }
}
