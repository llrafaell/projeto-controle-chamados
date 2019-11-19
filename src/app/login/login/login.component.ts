import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/authentication/login/login.service';
import { Router } from '@angular/router';
import { PoNotificationService } from '@portinari/portinari-ui';
import { ErrorSpringBoot } from 'src/app/interfaces/ErrorSpringBoot.model';
import { Login } from 'src/app/interfaces/login.model';
import { User } from 'src/app/interfaces/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = this.fb.group({
    username: ['daniel@daniel.com.br', [Validators.email, Validators.required]],
    password: ['12345678', [Validators.required, Validators.minLength(8)]]
  })

  constValue = {
    loading: <boolean>false
  }

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private notificationService: PoNotificationService
  ) { }

  ngOnInit() {
    this.loginService
      .getIsLogged$.subscribe((data) => {
        if (data) {
          this.router.navigate(['dashboard']);
        }
      })
  }

  get controls() {
    return this.loginForm.controls;
  }

  login() {
    this.constValue.loading = true;
    if (this.loginForm.invalid) {
      this.constValue.loading = false;
      return;
    } else {
      this.loginService
        .login(this.loginForm.value)
        .subscribe((data: Login) => {

        const jwtToken = `Bearer ${data.token}`;
        sessionStorage.setItem('token', jwtToken);

        const userInformation: User = data.user;
        sessionStorage.setItem('user', JSON.stringify(userInformation));

        this.loginService.setUserInformation$(userInformation);

        this.loginService.setIsLogged$(true);
        },
        (error: ErrorSpringBoot) => {
          this.loginService.setIsLogged$(false);
          this.notificationService.error('Acesso Negado!');
          this.constValue.loading = false;
        })
    }
  }

}
