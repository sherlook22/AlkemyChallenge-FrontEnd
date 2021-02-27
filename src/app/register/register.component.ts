import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {
    this.registerForm = this.fb.group({
      email: ['', Validators.required],
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
    console.log(this.registerForm.valid);
    console.log(this.registerForm.value);
    this.registerAccion()
    
  }

}
