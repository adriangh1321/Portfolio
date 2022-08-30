import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ServerOfflineComponent } from './components/server-offline/server-offline.component';
import { ShowProfileComponent } from './components/show-profile/show-profile.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
import { RegisterGuard } from './guards/register.guard';
import { HomeResolverService } from './resolvers/home-resolver.service';
import { PortfolioResolverService } from './resolvers/portfolio-resolver.service';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [RegisterGuard] },
  { path: 'server-offline', component: ServerOfflineComponent },
  {
    path: 'home', component: HomeComponent,
    runGuardsAndResolvers: 'always',
    resolve: {
      profiles: HomeResolverService
    }
  },
  {
    path: 'portfolios', component: HomeComponent,
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    resolve: {
      profiles: HomeResolverService
    }
  },

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
