import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { EducationsComponent } from './components/educations/educations.component';
import { EducationItemComponent } from './components/education-item/education-item.component';
import { EducationDetailsComponent } from './components/education-details/education-details.component';
import { EducationEditComponent } from './components/education-edit/education-edit.component';
import { SkillsComponent } from './components/skills/skills.component';
import { SkillItemComponent } from './components/skill-item/skill-item.component';
import { SkillDetailsComponent } from './components/skill-details/skill-details.component';
import { SkillEditComponent } from './components/skill-edit/skill-edit.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ProjectItemComponent } from './components/project-item/project-item.component';
import { ProjectDetailsComponent } from './components/project-details/project-details.component';
import { ProjectEditComponent } from './components/project-edit/project-edit.component';
import { AboutComponent } from './components/about/about.component';
import { AboutDetailsComponent } from './components/about-details/about-details.component';
import { AboutEditComponent } from './components/about-edit/about-edit.component';
import { BasicInfoComponent } from './components/basic-info/basic-info.component';
import { BasicInfoDetailsComponent } from './components/basic-info-details/basic-info-details.component';
import { BasicInfoEditComponent } from './components/basic-info-edit/basic-info-edit.component';
import { IntroductionComponent } from './components/introduction/introduction.component';
import { CurrentCompanyComponent } from './components/current-company/current-company.component';
import { CurrentCompanyDetailsComponent } from './components/current-company-details/current-company-details.component';
import { CurrentCompanyEditComponent } from './components/current-company-edit/current-company-edit.component';
import { ContactInfoDetailsComponent } from './components/contact-info-details/contact-info-details.component';
import { ContactInfoEditComponent } from './components/contact-info-edit/contact-info-edit.component';
import { ContactInfoComponent } from './components/contact-info/contact-info.component';
import { InterestItemComponent } from './components/interest-item/interest-item.component';
import { InterestEditComponent } from './components/interest-edit/interest-edit.component';
import { AuthInterceptor } from './http-interceptors/auth.interceptor';
import { RegisterComponent } from './components/register/register.component';
import { LoaderComponent } from './components/loader/loader.component';


@NgModule({
  declarations: [
    AppComponent,
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
    InterestDetailsComponent,
    EducationsComponent,
    EducationItemComponent,
    EducationDetailsComponent,
    EducationEditComponent,
    SkillsComponent,
    SkillItemComponent,
    SkillDetailsComponent,
    SkillEditComponent,
    ProjectsComponent,
    ProjectItemComponent,
    ProjectDetailsComponent,
    ProjectEditComponent,
    AboutComponent,
    AboutDetailsComponent,
    AboutEditComponent,
    BasicInfoComponent,
    BasicInfoDetailsComponent,
    BasicInfoEditComponent,
    IntroductionComponent,
    CurrentCompanyComponent,
    CurrentCompanyDetailsComponent,
    CurrentCompanyEditComponent,
    ContactInfoDetailsComponent,
    ContactInfoEditComponent,
    ContactInfoComponent,
    InterestItemComponent,
    InterestEditComponent,
    RegisterComponent,
    LoaderComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
