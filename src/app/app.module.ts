import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {AdminLayoutComponent} from './layouts/admin-layout/admin-layout.component';
import {AuthLayoutComponent} from './layouts/auth-layout/auth-layout.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {AppRoutingModule} from './app.routing';
import {ComponentsModule} from './components/components.module';
import {CommonModule, DatePipe} from "@angular/common";
import {BrowserModule} from "@angular/platform-browser";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {ToastrModule} from "ngx-toastr";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatFormFieldModule} from "@angular/material/form-field";


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ComponentsModule,
    NgbModule,
    MatSlideToggleModule,
    RouterModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    MatSelectModule,
    NgbModule,
    MatButtonModule,
    MatTooltipModule,
    MatFormFieldModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {
}
