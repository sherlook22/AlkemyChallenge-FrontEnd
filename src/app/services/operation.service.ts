import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class OperationService {

  private api_url: string;

  constructor(
    private http: HttpClient
  ) {
    this.api_url = environment.api_url;
  }

  public getOperations() {
    return this.http.get('http://localhost:3000/api/operation/index');
  }
}
