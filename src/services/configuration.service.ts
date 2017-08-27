import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

import { Configuration, Course, Project, Student } from '../definitions/definitions';

@Injectable()
export class ConfigurationService {

  private configuration: Configuration;

  constructor ( private http: HttpClient ) {}

  load (): Promise<Configuration> {
    if (this.configuration) {
      return Promise.resolve(this.configuration);
    }
    return this.http.get('/assets/config.json')
      .toPromise()
      .then( (configuration: Configuration) => this.configuration = configuration );
  }

  course (): Promise<Course> {
    return this.load()
      .then( (configuration: Configuration) => configuration.course );
  }

  students (): Promise<Student[]> {
    return this.course()
      .then( (course: Course) => course.students );
  }

  student (slug): Promise<Student> {
    return this.students()
      .then( (students: Student[]) => students
        .find( (student: Student) => student.slug === slug ) );
  }

  projects (): Promise<Project[]> {
    return this.course()
      .then( (course: Course) => course.projects );
  }

  project (slug): Promise<Project> {
    return this.projects()
      .then( (projects: Project[]) => projects
        .find( (project: Project) => project.slug === slug ) );
  }
}
