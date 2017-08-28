import { Component, OnInit } from '@angular/core';
import { ConfigurationService } from './services/configuration.service';
import { Course } from './definitions/definitions';

@Component({
  selector: 'wu-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  
  title = 'wu';
  course: Course;

  constructor ( private configuration: ConfigurationService ) {}

  ngOnInit() {
    this.configuration.course()
      .then( (course: Course) => this.course = course );
  }
}
