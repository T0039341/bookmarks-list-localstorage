//tried setting modifying the request header to allow cross origin
//however, it seems that this must be done from the server side


import { Injectable, Injector } from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpErrorResponse
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';



//intercept request to add allow Cors header
@Injectable({ providedIn: 'root' })
export class UrlInterceptor implements HttpInterceptor {

    baseUrl: string;
    constructor() {}
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        // Get the auth token from the service.
        const authReq = req.clone({
            headers: req.headers.set('Access-Control-Allow-Origin', '*')
        });
        return next.handle(authReq).pipe(
            catchError(err => {
                if (err.status === 0) {
                    console.log('cannot connect', err.error);
                }
                else if (err.error.status === '404') {
                    console.log('not found');
                } else if (err.error.status === '405') {
                    console.log('works')
                }
                return EMPTY

            })
        )
    }
}