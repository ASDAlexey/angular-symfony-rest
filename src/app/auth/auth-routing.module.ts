import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MetaGuard } from '@ngx-meta/core';

import { LayoutsModule } from '../layouts/layouts.module';
import { BlankLayoutComponent } from '../layouts/components/blank-layout/blank-layout.component';
// import { AuthGuard } from './services/auth-guard.service';
import { SignInComponent } from './sign-in/sign-in.component';

const authRoutes: Routes = [
  {
    path: '',
    component: BlankLayoutComponent,
    // canActivateChild: [MetaGuard],
    children: [
      {
        path: 'sign-in',
        component: SignInComponent,
        // canActivate: [AuthGuard],
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
