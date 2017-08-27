import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/map';

import { ConfigurationService } from '../../services/configuration.service';
import { Project, Deliverable, Student } from '../../definitions/definitions';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html'
})

export class ProjectComponent implements OnInit {

  project: Project;
  students: Student[];

  constructor (
    private configuration: ConfigurationService,
    private route: ActivatedRoute,
    private location: Location ) {}

  ngOnInit () {
    const slug: string = this.route.snapshot.paramMap.get('slug');
    this.configuration.students()
      .then( (students: Student[]) => this.students = students );
    this.configuration.project(slug)
      .then( (project: Project) => this.project = project );
  }

  deliverablePath ( project: Project, deliverable: Deliverable ) {
    return '/' + project.slug + '/' + deliverable.slug + '/' + deliverable.file;
  }

  studentDeliverablePath ( project: Project, deliverable: Deliverable, student: Student ) {
    return student.basePath + this.deliverablePath(project, deliverable);
  }
}
