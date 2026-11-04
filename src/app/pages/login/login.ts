import { Component } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Auth } from '../../services/auth';

import { Router } from '@angular/router';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',

  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule
  ],

  templateUrl: './login.html',

  styleUrl: './login.css',
})

export class Login {

  loginForm: FormGroup;

  constructor(

    private fb: FormBuilder,

    private auth: Auth,

    private router: Router

  ) {



    this.loginForm = this.fb.group({

      login: ['', Validators.required],

      password: ['', Validators.required]
    });



    const navigation =
      this.router.getCurrentNavigation();

    const state: any =
      navigation?.extras.state;

    if (state?.loginData) {

      this.loginForm.patchValue({

        login: state.loginData.login
      });
    }
  }

  loginUser() {

    if (this.loginForm.invalid) {

      return;
    }

    this.auth.login(this.loginForm.value)

      .subscribe({

        next: (res: any) => {

          localStorage.setItem(
            'token',
            res.token
          );

          alert(res.message);

          this.router.navigate(['/']);
        },

        error: (err) => {

          alert(err.error.message);
        }
      });
  }
}