import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

import { ConfigurationService } from '../../services/configuration.service';
import { Project } from '../../definitions/definitions';

@Component({
  selector: 'wu-projects',
  templateUrl: './projects.component.html'
})

export class ProjectsComponent implements OnInit {

  projects: Project[];

  constructor (
    private configuration: ConfigurationService
  ) {}

  ngOnInit () {
    this.configuration.projects()
      .then( projects => this.projects = projects );
  }

  get visibleProjects (): Project[] {
    if (!this.projects) {
      return [];
    }
    return this.projects
      .filter( project => project.hidden !== true );
  }

  formatDate(date: string): string {
    return moment(date).format('MMM D');
  }

}
