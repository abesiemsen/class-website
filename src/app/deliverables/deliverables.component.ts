import { Component, OnInit } from '@angular/core';

import { ConfigurationService } from '../../services/configuration.service';
import { Deliverable } from '../../definitions/definitions';

@Component({
  selector: 'app-deliverables',
  templateUrl: './deliverables.component.html'
})

export class DeliverablesComponent implements OnInit {

  deliverables: Deliverable[];

  constructor ( private configuration: ConfigurationService ) {}

  ngOnInit () {
    this.configuration.deliverables()
      .then( deliverables => this.deliverables = deliverables );
  }

  deliverablePath (deliverable: Deliverable): string {
    return '/' + deliverable.projectSlug + '/' + deliverable.slug + '/' + deliverable.file;
  }

}
