import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ShowProfileComponent } from './components/show-profile/show-profile.component';


const routes: Routes = [{ path: 'login', component: LoginComponent },
{ path: 'profile', component: ShowProfileComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
