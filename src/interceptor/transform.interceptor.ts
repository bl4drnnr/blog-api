import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response } from '../response/response.interface';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response> {
  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<Response> {
    return next.handle().pipe(
      map((data) => ({
        statusCode: context.switchToHttp().getResponse().statusCode,
        message: data.message || '',
        data
      }))
    );
  }
}
