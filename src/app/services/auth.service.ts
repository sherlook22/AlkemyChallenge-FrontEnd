import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly apiUrl = environment.api_url;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  login(user: any ) {
    return this.http.post(`${this.apiUrl}/login`, user);
  }

  loggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }
  
  logOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
