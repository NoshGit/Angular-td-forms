import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from "rxjs/operators"
import { IUserSettings } from './user-setting.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {


  constructor(private http: HttpClient) { }

  postUserSettings(userSettings: IUserSettings): Observable<any>{
    const url = 'https://putsreq.com/0h4GCeEMHn1PtQSxanYy';
    return this.http.post(url, userSettings);
    //return of(userSettings);
  }

  getSubscriptions(): Observable<any>{
    const url = 'https://putsreq.com/Sjawx0lfQ7TEpy5YUb17';

    return this.http.get(url).pipe(
      tap(data => console.log('From Get Subtype service Tap', data)),
      catchError(this.errorHandler)
    );
    //return of(['Monthly', 'Annual', 'Lifetime']);
  }

  errorHandler(error: HttpErrorResponse) {
    var errorMsg:string = '';
    if(error.error instanceof ErrorEvent){
      errorMsg = `An Error occured ${error.error.message}`;
    }else{
      errorMsg = `Server Return Code: ${error.status}, error message is: ${error.message}`;
    }
    return throwError(errorMsg);
  }
  
}

