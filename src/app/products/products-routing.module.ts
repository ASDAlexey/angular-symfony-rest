import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutsModule } from '../layouts/layouts.module';
import { BasicLayoutComponent } from '../layouts/components/basic-layout/basic-layout.component';
import { ProductListComponent } from './product-list/product-list.component';

const authRoutes: Routes = [
  {
    path: '',
    component: BasicLayoutComponent,
    // canActivateChild: [MetaGuard],
    children: [
      {
        path: '',
        component: ProductListComponent,
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
export class ProductsRoutingModule {
}
