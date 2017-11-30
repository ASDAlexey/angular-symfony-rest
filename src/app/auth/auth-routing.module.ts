import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutsModule } from '../layouts/layouts.module';
import { BlankLayoutComponent } from '../layouts/components/blank-layout/blank-layout.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { PublicGuardService } from '../shared/services/public-guard.service';

const authRoutes: Routes = [
  {
    path: '',
    component: BlankLayoutComponent,
    // canActivate: [PublicGuardService],
    // canActivateChild: [MetaGuard],
    children: [
      {
        path: '',
        component: SignInComponent,
        // canActivate: [PublicGuardService],
        // data: { meta: { title: 'Login' } },
      },
      {
        path: 'sign-up',
        component: SignUpComponent,
        // canActivate: [PublicGuardService],
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
