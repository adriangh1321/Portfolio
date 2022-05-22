import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { EducationComponent } from './components/education/education.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditPortfolioComponent } from './components/edit-portfolio/edit-portfolio.component';
import { EditExperienceComponent } from './components/edit-experience/edit-experience.component';
import { AddExperienceComponent } from './components/add-experience/add-experience.component';
import { EditAboutComponent } from './components/edit-about/edit-about.component';
import { EditEducationComponent } from './components/edit-education/edit-education.component';
import { ShowContactComponent } from './components/show-contact/show-contact.component';
import { EditContactComponent } from './components/edit-contact/edit-contact.component';
import { EditSkillComponent } from './components/edit-skill/edit-skill.component';
import { EditProjectComponent } from './components/edit-project/edit-project.component';
import { ShowProfileComponent } from './components/show-profile/show-profile.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ExperiencesComponent } from './components/experiences/experiences.component';

import { ExperienceItemComponent } from './components/experience-item/experience-item.component';

import { ExperienceDetailsComponent } from './components/experience-details/experience-details.component';
import { ExperienceEditComponent } from './components/experience-edit/experience-edit.component';
import { InterestsComponent } from './components/interests/interests.component';
import { CollapseComponent } from './components/collapse/collapse.component';
import { MoreComponent } from './components/more/more.component';
import { AddSectionComponent } from './components/add-section/add-section.component';
import { InterestDetailsComponent } from './components/interest-details/interest-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    
    
    EducationComponent,
    EditPortfolioComponent,
    EditExperienceComponent,
    AddExperienceComponent,
    EditAboutComponent,
    EditEducationComponent,
    ShowContactComponent,
    EditContactComponent,
    EditSkillComponent,
    EditProjectComponent,
    ShowProfileComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    ExperiencesComponent,
   
    ExperienceItemComponent,
    
    ExperienceDetailsComponent,
    ExperienceEditComponent,
    InterestsComponent,
    CollapseComponent,
    MoreComponent,
    AddSectionComponent,
    InterestDetailsComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
