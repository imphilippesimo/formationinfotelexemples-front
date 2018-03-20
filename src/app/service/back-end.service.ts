import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { IdentifiantsVM } from '../model/IndentifiantsVM';
import { HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
}

@Injectable()
export class BackEndService {

  


  constructor(private http: HttpClient) { }


  Login(identifiantsVm: IdentifiantsVM): Observable<any>
  {
    console.log(identifiantsVm);
    return this.http.post<IdentifiantsVM>("http://localhost:8080/GestionBiblio/member/login", identifiantsVm, httpOptions)
    .pipe(      
      retry(3),
      catchError(this.handleError)
    );
  } 

    private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an ErrorObservable with a user-facing error message
    return new ErrorObservable(
      'Something bad happened; please try again later.');
    };

    handleData(data: any){      
      if(data.success){
        //resquest suceed in server
        console.log(data.message);
        //messageService.displaySucessfulMessage(data.message);
      }else{
        console.error(data.message);
        //messageService.displayFailureMessage(data.message);
      }

    }
}
