import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Item } from '../model/Item';

const ITEM_BASE_URL = "http://localhost:8090/api/item";

@Injectable({
  providedIn: 'root'
})



export class ItemService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error(error.error);
    } else if (error.status === 404) {
      return throwError(() => Error(error.error));
    }
    return throwError(() => new Error(error.error));
  }

  getItemsBySearch(search: string): Observable<Item[]> {
    return this.http.get<Item[]>(`${ITEM_BASE_URL}/all_by_search?search=${search}`, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

}
