import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutsModule } from '../layouts/layouts.module';
import { BasicLayoutComponent } from '../layouts/components/basic-layout/basic-layout.component';
import { ProductListComponent } from './product-list/product-list.component';
import { PrivateGuardService } from '../shared/services/private-guard.service';
import { ProductAddEditComponent } from './product-add-edit/product-add-edit.component';

const authRoutes: Routes = [
  {
    path: '',
    component: BasicLayoutComponent,
    canActivate: [PrivateGuardService],
    // canActivateChild: [MetaGuard],
    children: [
      {
        path: '',
        component: ProductListComponent,
        // data: { meta: { title: 'Login' } },
      },
      {
        path: 'new',
        component: ProductAddEditComponent,
        // data: { meta: { title: 'Login' } },
      },
      {
        path: ':id',
        component: ProductAddEditComponent,
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
export class ProductsRoutingModule {
}
