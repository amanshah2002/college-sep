import { EditCompanyAccountComponent } from './edit-account/edit-company-account/edit-company-account.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material/material.module';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterCompanyComponent } from './register-company/register-company.component';
import { HttpClientModule } from '@angular/common/http';
import { CompanyComponent } from './company/company.component';
import { LayoutComponent } from './shared/layout/layout.component';
import { QRCodeModule } from 'angular2-qrcode';
import { WaitingListComponent } from './waiting-list/waiting-list.component';
import { DialogComponent } from './shared/dialog/dialog.component';
import { EditAccountComponent } from './edit-account/edit-account.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AwaitConfirmationComponent } from './await-confirmation/await-confirmation.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterCompanyComponent,
    CompanyComponent,
    LayoutComponent,
    WaitingListComponent,
    DialogComponent,
    EditAccountComponent,
    AwaitConfirmationComponent,
    EditCompanyAccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    QRCodeModule,
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
