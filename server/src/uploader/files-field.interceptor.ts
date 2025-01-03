import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class FilesFieldInterceptor implements NestInterceptor {
  constructor(
    private fieldName: string,
    private maxCount: number,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const filesField = req.files && req.files[this.fieldName];

    if (!filesField) {
      return throwError(new BadRequestException(`No files found for field ${this.fieldName}`));
    }

    if (Array.isArray(filesField) && filesField.length > this.maxCount) {
      return throwError(new BadRequestException(`Exceeded maximum file count of ${this.maxCount} for ${this.fieldName}`));
    }

    return next.handle().pipe(
      catchError((error) => {
        if (error.code === 'LIMIT_UNEXPECTED_FILE') {
          throw new BadRequestException(`Exceeded maximum file count of ${this.maxCount} for ${this.fieldName}`);
        }
        throw error;
      }),
    );
  }
}
