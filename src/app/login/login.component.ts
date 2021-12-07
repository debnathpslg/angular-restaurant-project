import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private _http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: [''],
    });
  }

  submitLogin() {
    this._http.get<any>('http://localhost:3000/users').subscribe((res) => {
      const userFound = res.find((a: any) => {
        return (
          a.email === this.loginForm.value.email &&
          a.password === this.loginForm.value.password
        );
      });

      if (userFound) {
        alert('User logged in successfully');
        this.loginForm.reset();
        this.router.navigate(['/resto-dash']);
      } else {
        alert('Wrong credentila. Please check and login again...');
        this.loginForm.reset();
      }
    }),
      (err: any) => {
        alert('Something went wrong while loggin user !!!');
      };
  }
}
