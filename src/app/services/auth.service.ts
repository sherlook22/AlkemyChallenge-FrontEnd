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

  loggedIn(): boolean {
    return !!localStorage.getItem('token');
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
