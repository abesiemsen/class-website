import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectComponent } from './project/project.component';
import { StudentsComponent } from './students/students.component';
import { StudentComponent } from './student/student.component';
import { DeliverablesComponent } from './deliverables/deliverables.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'projects',
    component: ProjectsComponent
  },
  {
    path: 'project/:slug',
    component: ProjectComponent
  },
  {
    path: 'students',
    component: StudentsComponent
  },
  {
    path: 'student/:slug',
    component: StudentComponent
  },
  {
    path: 'deliverables',
    component: DeliverablesComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
