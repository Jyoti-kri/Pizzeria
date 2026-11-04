import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  registerForm!: FormGroup;

  constructor(

    private fb: FormBuilder,

    private auth: Auth,

    private router: Router

  ) {

    this.registerForm = this.fb.group({

      username: ['', Validators.required],

      email: ['', [
        Validators.required,
        Validators.email
      ]],

      password: ['', [
        Validators.required,
        Validators.minLength(6)
      ]]
    });
  }

  registerUser() {

    if (this.registerForm.invalid) {

      return;
    }

    this.auth.register(this.registerForm.value)

      .subscribe({

        next: (res: any) => {

          alert(res.message);

          this.registerForm.reset();


          this.router.navigate(
            ['/login'],
            {
              state: {
                loginData: {
                  login: this.registerForm.value.email
                }
              }
            })
        },

        error: (err) => {

          alert(err.error.message);
        }
      });
  }

}
