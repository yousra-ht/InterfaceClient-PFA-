import { BrowserModule } from '@angular/platform-browser';
import { NgModule , } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './HomeFolder/home/home.component'
import { RestapiService } from './restapi.service';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MenuHeadComponent } from './menu-head/menu-head.component';
import { MenuNavComponent } from './menu-nav/menu-nav.component';
import { ReservationComponent } from './reservation/reservation.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FlatpickrModule } from 'angularx-flatpickr';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { UploadFileComponent } from './UploadFileFolder/upload-file/upload-file.component'
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './AuthentificationFolder/Component/register/register.component';
import { LoginComponent } from './AuthentificationFolder/Component/login/login.component'
import {FormsModule } from '@angular/forms'
import { routing } from './app-routing.module';
import { BoradadminComponent } from './boradadmin/boradadmin.component'
import {authInterceptorProviders} from './_helpers/auth.interceptor';
import { InterfaceLabviewComponent } from './interface-labview/interface-labview.component';
import { LoginTpComponent } from './LoginTpFolder/login-tp/login-tp.component'

const routes: Routes = [

  // {path :'' , component : LoginComponent}, 

];
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuHeadComponent,
    MenuNavComponent,
    ReservationComponent,
    UploadFileComponent,
    RegisterComponent,
    LoginComponent,
    BoradadminComponent,
    InterfaceLabviewComponent,
    LoginTpComponent
  ],
  imports: [

    RouterModule.forRoot(routes),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    NgbModalModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    ReactiveFormsModule,
    routing,
    


  ],
  exports: [RouterModule],
  providers: [authInterceptorProviders,RestapiService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
