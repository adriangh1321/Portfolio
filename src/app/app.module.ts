import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { EducationComponent } from './components/education/education.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditPersonComponent } from './components/edit-person/edit-person.component';
import { EditExperienceComponent } from './components/edit-experience/edit-experience.component';
import { AddExperienceComponent } from './components/add-experience/add-experience.component';
import { EditAboutComponent } from './components/edit-about/edit-about.component';
import { EditEducationComponent } from './components/edit-education/edit-education.component';
import { ShowContactComponent } from './components/show-contact/show-contact.component';
import { EditContactComponent } from './components/edit-contact/edit-contact.component';
import { EditSkillComponent } from './components/edit-skill/edit-skill.component';
import { EditProyectComponent } from './components/edit-proyect/edit-proyect.component';
import { ShowProfileComponent } from './components/show-profile/show-profile.component';


@NgModule({
  declarations: [
    AppComponent,
    
    
    EducationComponent,
    EditPersonComponent,
    EditExperienceComponent,
    AddExperienceComponent,
    EditAboutComponent,
    EditEducationComponent,
    ShowContactComponent,
    EditContactComponent,
    EditSkillComponent,
    EditProyectComponent,
    ShowProfileComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
