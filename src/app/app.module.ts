import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MyLoaderComponent } from './components/my-loader/my-loader.component';
import { LoaderService } from './services/loader.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {LoaderInterceptorService} from './interceptors/loader-interceptor.service'

@NgModule({
  declarations: [
    AppComponent,
    MyLoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [LoaderService
  ,{provide: HTTP_INTERCEPTORS, useClass:LoaderInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
