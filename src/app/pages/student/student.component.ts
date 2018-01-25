import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/map';

import { ConfigurationService } from '../../services/configuration.service';
import { Project, Deliverable, Student } from '../../definitions/definitions';

@Component({
  selector: 'wu-student',
  templateUrl: './student.component.html'
})

export class StudentComponent implements OnInit {

  student: Student;
  projects: Project[];

  constructor (
    private configuration: ConfigurationService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit () {
    const slug: string = this.route.snapshot.paramMap.get('slug');
    this.configuration.projects()
      .then( (projects: Project[]) => this.projects = projects );
    this.configuration.person(slug)
      .then( (student: Student) => this.student = student );
  }

  public get visibleProjects(): Project[] {
    if (!this.projects) {
      return [];
    }
    return this.projects
      .filter( project => project.hidden !== true );
  }

  public visibleDeliverables(project: Project): Deliverable[] {
    if (!project) {
      return [];
    }
    return project.deliverables
      .filter( deliverable => deliverable.hidden !== true && typeof deliverable.file != 'undefined' );
  }

  pathFor ( project: Project, deliverable: Deliverable, student: Student ) {
    return student.basePath + '/' + project.slug + '/' + deliverable.slug + '/' + deliverable.file;
  }
}
