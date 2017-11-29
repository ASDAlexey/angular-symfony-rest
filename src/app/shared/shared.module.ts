import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { NgxPaginationModule } from 'ngx-pagination';
import { SharedConstants } from './shared.constant';
import { ButtonComponent } from './components/button/button.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { InputComponent } from './components/input/input.component';
import { ReplacePipe } from './pipes/replace.pipe';
import { SelectComponent } from './components/select/select.component';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { RadioComponent } from './components/radio/radio.component';
import { RadioItemComponent } from './components/radio/radio-item/radio-item.component';
import { ModalComponent } from './components/modal/modal.component';
import { ModalService } from './services/modal.service';
import { ConfirmDirective } from './directives/confirm.directive';
import { PreloaderComponent } from './components/preloader/preloader.component';
import { MyDatePickerModule } from 'mydatepicker';
import { PublicGuardService } from './services/public-guard.service';
import { PrivateGuardService } from './services/private-guard.service';
import { AuthService } from './services/auth.service';

const modules = [
  FormsModule,
  CommonModule,
  // TranslateModule,
  ReactiveFormsModule,
  MyDatePickerModule,
  // NgxPaginationModule,
];

const services = [
  PublicGuardService,
  PrivateGuardService,
  AuthService,
  SharedConstants,
  ModalService,
];

const pipes = [
  ReplacePipe,
];

const components = [
  InputComponent,
  CheckboxComponent,
  SelectComponent,
  ButtonComponent,
  DatePickerComponent,
  RadioComponent,
  RadioItemComponent,
  ModalComponent,
  ConfirmDirective,
  PreloaderComponent,
];


@NgModule({
  imports: [...modules],
  declarations: [...components, ...pipes],
  exports: [...modules, ...components, ...pipes],
  providers: [
    ...services,
  ],
})
export class SharedModule {
}
