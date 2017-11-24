import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BlankLayoutComponent } from './components/blank-layout/blank-layout.component';
import { BasicLayoutComponent } from './components/basic-layout/basic-layout.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    BlankLayoutComponent,
    BasicLayoutComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
  ],
  exports: [
    BlankLayoutComponent,
    BasicLayoutComponent,
  ],
})

export class LayoutsModule {
}
