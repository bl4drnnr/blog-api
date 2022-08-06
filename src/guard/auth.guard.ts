import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const req = context.switchToHttp().getRequest();
      const authHeader = req.headers.authorization;
      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];

      if (bearer !== 'Bearer' || !token)
        throw new UnauthorizedException({ message: 'unauthorized' });

      const payload = this.authService.verifyToken(token);

      if (payload.type !== 'access')
        throw new UnauthorizedException({ message: 'unauthorized' });

      req.user = payload;
      return true;
    } catch (e) {
      throw new UnauthorizedException({ message: 'unauthorized' });
    }
  }
}
