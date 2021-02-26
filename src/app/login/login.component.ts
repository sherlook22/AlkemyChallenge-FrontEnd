import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  // public msj: string;

  constructor(
    private _authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: [''],
      password: ['']
    });
  }

  ngOnInit(): void {
  }

  validateData() {
    console.log(this.loginForm.value);
    
    if(this.loginForm.valid) {
      this._authService.login(this.loginForm.value)
        .subscribe((res) => {
          this.router.navigate(['/']);
        },(err) => {
          console.log(err);
        });
    }

  }

}
