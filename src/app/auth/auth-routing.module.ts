import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutsModule } from '../layouts/layouts.module';
import { BlankLayoutComponent } from '../layouts/components/blank-layout/blank-layout.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { PublicGuardService } from './public-guard.service';
import { SignUpComponent } from './sign-up/sign-up.component';

const authRoutes: Routes = [
  {
    path: '',
    component: BlankLayoutComponent,
    canActivate: [PublicGuardService],
    // canActivateChild: [MetaGuard],
    children: [
      {
        path: '',
        component: SignInComponent,
        // data: { meta: { title: 'Login' } },
      },
      {
        path: 'sign-up',
        component: SignUpComponent,
        // data: { meta: { title: 'Login' } },
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(authRoutes),
    LayoutsModule,
  ],
  exports: [RouterModule],
})
export class AuthRoutingModule {
}
