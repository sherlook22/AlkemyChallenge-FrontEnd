import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class TypeService {
  base_url: string;

  constructor(private http: HttpClient) { 
    this.base_url = environment.api_url
  }

  getTypes() {
    return this.http.get(`${this.base_url}/type/index`);
  }
}
