import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';

// import { AuthService } from './services/auth.service';

// import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';

const modules = [
  CommonModule,
  SharedModule,
  AuthRoutingModule,
];

const services = [
  // AuthService,
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
