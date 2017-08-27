import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ConfigurationService } from './services/configuration.service';
import { LinkService } from './services/link.service';
import { HomeComponent } from './pages/home/home.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { ProjectComponent } from './pages/project/project.component';
import { StudentsComponent } from './pages/students/students.component';
import { StudentComponent } from './pages/student/student.component';
import { DeliverablesComponent } from './pages/deliverables/deliverables.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProjectsComponent,
    ProjectComponent,
    StudentsComponent,
    StudentComponent,
    DeliverablesComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    ConfigurationService,
    LinkService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
