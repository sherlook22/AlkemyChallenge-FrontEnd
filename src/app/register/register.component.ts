import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]],
      password: ['', Validators.required],
      password2: ['', Validators.required]
    }, {
      validators: this.equalsPasswords()
    });
  }

  ngOnInit(): void {
  }

  equalsPasswords() {
    return ( formGroup: FormGroup ) => {
      const pass1: any = formGroup.get('password');
      const pass2: any = formGroup.get('password2');
      if( pass1.value !== pass2.value ) pass2?.setErrors({ equal: false });
    }
  }

  registerAccion() {
    Object.values( this.registerForm.controls).forEach((ctls) => {
      ctls.markAsTouched();
    })
  }

  validateData(){
    if(!this.registerForm.valid) {
      this.registerAccion()
    }
    const { email, password } = this.registerForm.value;

    this._authService.register({email, password}).subscribe(
      (res) => {
        this.router.navigate(['/login']);
      }
    )
  }

}
