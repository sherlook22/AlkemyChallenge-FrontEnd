import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class OperationService {
  private api_url : string;
  private refresh$ = new Subject<void>();

  constructor(
    private http: HttpClient
  ) { 
    this.api_url = environment.api_url
  }

  get refresh() {
    return this.refresh$;
  }

  public getOperations(page=1, user: any) {
    return this.http.get(`${this.api_url}/operation/index?page=${page}&user=${user}`);
  }

  //Should be created the interface for Operation
  public createOperation(operation: any, user: any): Observable<any> {
    return this.http.post(`${this.api_url}/operation/register`, {
      operation,
      user
    }).pipe(
      tap(() => {
        this.refresh$.next();
      })
    );
  }

  public updateOperation(operation: any) {
    return this.http.put(`${this.api_url}/operation/update`, {
      operation
    }).pipe(
      tap(() => {
        this.refresh$.next();
      })
    );
  }
  
  public deleteOperation(id:any) {
    return this.http.delete(`${this.api_url}/operation/delete/${id}`)
    .pipe(
      tap(() => {
        this.refresh$.next();
      })
    );
  }

}
