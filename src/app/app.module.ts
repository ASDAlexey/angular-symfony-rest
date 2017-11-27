import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { MetaLoader, MetaModule, MetaStaticLoader, PageTitlePositioning } from '@ngx-meta/core';
import { RequestService } from './shared/services/request.service';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { ErrorsInterceptor } from './interceptors/errors.interceptor';
import { RequestInterceptor } from './interceptors/request.interceptor';
import { LayoutsModule } from './layouts/layouts.module';
import { AppRoutingModule } from './app-routing.module';
import { MobileDetectDirective } from './shared/directives/mobile-detect.directive';

// export function metaFactory(translate: TranslateService): MetaLoader {
//   return new MetaStaticLoader({
//     callback: (key: string) => translate.get(key),
//     pageTitlePositioning: PageTitlePositioning.PrependPageTitle,
//     pageTitleSeparator: ' - ',
//     applicationName: 'app_name',
//   });
// }

@NgModule({
  declarations: [
    AppComponent,
    MobileDetectDirective,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LayoutsModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    // ToastrModule.forRoot({ timeOut: 1500, preventDuplicates: true }),
    // MetaModule.forRoot({
    //   provide: MetaLoader,
    //   useFactory: (metaFactory),
    //   deps: [TranslateService],
    // }),
  ],
  providers: [
    RequestService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorsInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
