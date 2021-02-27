import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

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
    return this.http.post(`${this.apiUrl}/auth/login`, user).pipe(
      tap((res:any) => {
        this.saveToken(res.res);
      })
    );
  }

  register(user: any) {
    return this.http.post(`${this.apiUrl}/auth/register`, user);
  }

  loggedIn() {
    const payload: any = this.decodeToken();
    
    if(!payload) return false;
    
    if(Date.now() >= payload.exp) {
      this.logOut();      
      return false;
    }
    return true;
  }

  decodeToken() {
    const token:any = this.getToken();
    if(!token) return false;
    const payload:any = JSON.parse(atob(token?.split('.')[1]));
    return payload;
  }

  getToken() {
    return localStorage.getItem('token');
  }

  private saveToken(token: string) {
    localStorage.setItem('token', token);
  }
  
  logOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
