import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  getClientMessage(error: Error): string {
    if (!navigator.onLine) {
        return 'No Internet Connection';
    }
    return error.message ? error.message : error.toString();
}

getClientStack(error: Error): string | undefined {
    return error.stack;
}

getServerMessage(error: HttpErrorResponse): string {
    return error.error['description'] || error.message;
}

getServerStack(error: HttpErrorResponse): string {
    // handle stack trace
    return 'stack';
}
}
