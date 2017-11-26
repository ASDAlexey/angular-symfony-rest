import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';


// import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { AuthService } from './auth.service';

const modules = [
  CommonModule,
  SharedModule,
  AuthRoutingModule,
];

const services = [
  AuthService,
];

const components = [
  SignInComponent,
  // SignUpComponent,
];

@NgModule({
  declarations: [
    ...components,
  ],
  imports: [
    ...modules,
  ],
  providers: [
    ...services,
  ],
})
export class AuthModule {

}
