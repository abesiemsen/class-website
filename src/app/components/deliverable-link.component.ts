import { Component, OnInit, Input } from '@angular/core';

import { LinkService } from '../services/link.service';
import { Project, Deliverable, DeliverableConfig, Person } from '../definitions/definitions';

@Component({
  selector: 'wu-deliverable-link',
  templateUrl: './deliverable-link.component.html',
  styleUrls: ['./deliverable-link.component.scss']
})

export class DeliverableLinkComponent implements OnInit {

  @Input() project: Project;
  @Input() deliverable: Deliverable;
  @Input() person: Person;
  @Input() label: string;

  found = false;
  file: string;
  deliverableConfig: DeliverableConfig;

  constructor (
    private linkService: LinkService
  ) {}

  ngOnInit () {
    this.checkLinks();
  }

  public get displayName(): string {
    if (this.label) {
      return this.label;
    }
    return this.person.firstName + ' ' + this.person.lastName;
  }

  private checkLinks () {
    const singlePath: string = this.linkService.deliverableSingleFilePathForPerson(this.project, this.deliverable, this.person);
    const multiPath: string = this.linkService.deliverableConfigPathForPerson(this.project, this.deliverable, this.person);
    this.linkService.check(singlePath)
      .then( (found: boolean) => {
        if ( found ) {
          this.found = true;
        }
        this.file = singlePath;
      });

    this.linkService.loadDeliverableConfig(multiPath)
      .then( (deliverableConfig: DeliverableConfig) => {
        if ( deliverableConfig ) {
          this.found = true;
          this.deliverableConfig = this.linkService.expandEntrypointPaths(deliverableConfig, this.project, this.deliverable, this.person);
        }
      });

  }

}
