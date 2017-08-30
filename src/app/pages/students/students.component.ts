import { Component, OnInit } from '@angular/core';

import { ConfigurationService } from '../../services/configuration.service';
import { Student } from '../../definitions/definitions';

@Component({
  selector: 'wu-students',
  templateUrl: './students.component.html'
})

export class StudentsComponent implements OnInit {

  students: Student[];

  constructor ( private configuration: ConfigurationService ) {}

  ngOnInit () {
    this.configuration.students()
      .then( students => this.students = students );
  }

}
