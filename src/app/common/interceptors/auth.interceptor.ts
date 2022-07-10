import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Please inser a valid token here.
        const authToken = "";
        if (authToken && !req.headers.get('Authorization')) {
            const authReq = req.clone({ headers: req.headers.set('Authorization', 'Basic ' + authToken) });
            return next.handle(authReq);
        }

        return next.handle(req);
    }
}
