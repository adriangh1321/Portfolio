import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ShowProfileComponent } from './components/show-profile/show-profile.component';
import { AuthGuard } from './guards/auth.guard';
import { PortfolioResolverService } from './resolvers/portfolio-resolver.service';


const routes: Routes = [
  { path: '', redirectTo: '/profile', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  {
    path: "profile/:nickname",
    component: ShowProfileComponent, canActivate: [AuthGuard],
    resolve: {
      portfolio: PortfolioResolverService
    }
  }]; // visit home only if authenticate


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
