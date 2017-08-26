import { Component, OnInit } from '@angular/core';

import { ConfigurationService } from '../../services/configuration.service';
import { Course, Project, Deliverable, Student } from '../../definitions/definitions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  course: Course;

  constructor ( private configuration: ConfigurationService ) {}

  ngOnInit () {
    this.configuration.course()
      .then( course => this.course = course );
  }

  pathFor ( project: Project, deliverable: Deliverable, student: Student ) {
    return student.basePath + '/' + project.slug + '/' + deliverable.slug + '/' + deliverable.file;
  }
}
