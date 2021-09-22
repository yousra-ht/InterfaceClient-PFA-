import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReservationComponent } from '../app/reservation/reservation.component';
import { RegisterComponent } from './AuthentificationFolder/Component/register/register.component';
import { LoginComponent } from './AuthentificationFolder/Component/login/login.component'
import { HomeComponent } from './HomeFolder/home/home.component'
import { ModuleWithProviders } from '@angular/core'
import { LoginTpComponent } from './LoginTpFolder/login-tp/login-tp.component';
import { UploadFileComponent } from './UploadFileFolder/upload-file/upload-file.component';
const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'Home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'reservation/:dynamicParameter', component: ReservationComponent },
  { path: 'LoginTp/:dynamicParameter', component: LoginTpComponent },
  { path: 'upload/:dynamicParameter', component: UploadFileComponent },

];
@NgModule({
  declarations: [],

  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
export const routing: ModuleWithProviders = RouterModule.forRoot(routes)
