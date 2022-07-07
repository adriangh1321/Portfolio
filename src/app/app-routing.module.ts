import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ShowProfileComponent } from './components/show-profile/show-profile.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
import { RegisterGuard } from './guards/register.guard';
import { PortfolioResolverService } from './resolvers/portfolio-resolver.service';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent ,canActivate: [LoginGuard]},
  { path: 'register', component: RegisterComponent,canActivate: [RegisterGuard] },
  { path: 'home', component: HomeComponent },
  {
    path: "profile/:nickname",
    runGuardsAndResolvers: "always",
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
