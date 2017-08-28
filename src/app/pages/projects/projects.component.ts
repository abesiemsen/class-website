import { Component, OnInit } from '@angular/core';

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

}
