import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

declare var M: any;

@Injectable()
export class HttpErrorHandlerInterceptor implements HttpInterceptor {
    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let popupMessage: string = '';
        if (request.headers.has('userFriendlyMessage')) {
            popupMessage = request.headers.get('userFriendlyMessage') || "";
            request = request.clone({ headers: request.headers.delete('userFriendlyMessage') });
        }

        return next.handle(request)
            .pipe(
                catchError(this.handleError.bind(this, popupMessage))
            )
    }

    private handleError(userFriendlyMessage: string, error: HttpErrorResponse) {
        if (error.status === 401) {
            const unauthorizedMessage: string = "Unauthorized access. Please check you access token."
            M.toast({ html: unauthorizedMessage })
            console.error(unauthorizedMessage);
        } else if (userFriendlyMessage) {
            M.toast({ html: userFriendlyMessage })
            console.error(userFriendlyMessage);
        }
        return throwError(() => error);
    };
}
