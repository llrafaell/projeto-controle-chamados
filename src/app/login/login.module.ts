import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login/login.component';
import { PoFieldModule, PoPageModule, PoButtonModule } from '@portinari/portinari-ui';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    PoPageModule,
    PoFieldModule,
    FormsModule,
    ReactiveFormsModule,
    PoButtonModule
  ]
})
export class LoginModule { }
