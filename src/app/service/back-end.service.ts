import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { IdentifiantsVM } from '../model/IndentifiantsVM';
import { HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators';
import {MessagesService} from './messages.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    
  }),withCredentials:true
}

@Injectable()
export class BackEndService {

  


  constructor(private http: HttpClient, private msService: MessagesService) { }


  Login(identifiantsVm: IdentifiantsVM): Observable<any>
  {
    console.log(identifiantsVm);
    return this.http.post<IdentifiantsVM>("http://localhost:8080/GestionBiblio/member/login", identifiantsVm, httpOptions)
    .pipe(      
      retry(3),
      catchError(this.handleError)
    );
  } 

  add(book: any): Observable<any>
  {
    
    return this.http.post("http://localhost:8080/GestionBiblio/book/add", book, httpOptions)
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
      'Une erreur s\'est produite lors du traitement de votre requête');
    };

    handleData(data: any){      
      if(data.success){
        //resquest suceed in server
        console.log(data.message);
        this.msService.displaySuccessfullMessage(data.message);
      }else{
        console.error(data.message);
        this.msService.displayErrorMessage(data.message);
      }

    }
}
