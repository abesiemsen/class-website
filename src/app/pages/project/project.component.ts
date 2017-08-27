import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/map';

import { ConfigurationService } from '../../services/configuration.service';
import { LinkService } from '../../services/link.service';
import { Project, Deliverable, DeliverableSet, DeliverableConfig, PersonLink, Person } from '../../definitions/definitions';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html'
})

export class ProjectComponent implements OnInit {

  project: Project;
  deliverableSets: DeliverableSet[];

  constructor (
    private configuration: ConfigurationService,
    private linkService: LinkService,
    private route: ActivatedRoute,
    private location: Location ) {}

  ngOnInit () {
    const slug: string = this.route.snapshot.paramMap.get('slug');
    this.loadProject(slug);
  }

  private loadProject (slug): Promise<Project> {
    return this.configuration.project(slug)
      .then( (project: Project) => {
        this.project = project;
        const sets = this.project.deliverables.map( deliverable => ({ deliverable: deliverable, personLinks: [] }) );
        this.deliverableSets = sets;
        this.checkLinks(sets);
        return project;
      });
  }

  private checkLinks (deliverableSets: DeliverableSet[]) {
    this.configuration.persons()
      .then( (persons: Person[]) => {
        deliverableSets.forEach( (deliverableSet: DeliverableSet) => {
          persons.forEach( (person: Person) => {
            const singlePath: string = this.deliverableSingleFilePathForPerson(this.project, deliverableSet.deliverable, person);
            const multiPath: string = this.deliverableConfigPathForPerson(this.project, deliverableSet.deliverable, person);
            const personLink: PersonLink = { person: person, found: false };
            deliverableSet.personLinks.push(personLink);
            this.linkService.check(singlePath)
              .then( (found: boolean) => {
                if ( found ) {
                  personLink.found = true;
                  personLink.file = singlePath;
                }
              });
            this.linkService.loadDeliverableConfig(multiPath)
              .then( (deliverableConfig: DeliverableConfig) => {
                if ( deliverableConfig ) {
                  personLink.found = true;
                  personLink.deliverableConfig = deliverableConfig;
                }
              });
          });
        });
      });
  }

  abstractDeliverablePath ( project: Project, deliverable: Deliverable ): string {
    return project.slug + '/' + deliverable.slug + '/';
  }

  deliverablePathForPerson ( project: Project, deliverable: Deliverable, person: Person ): string {
    return person.basePath + this.abstractDeliverablePath(project, deliverable);
  }

  abstractDeliverableSingleFilePath ( project: Project, deliverable: Deliverable ): string {
    return this.abstractDeliverablePath(project, deliverable) + deliverable.file;
  }

  abstractDeliverableConfigPath ( project: Project, deliverable: Deliverable ): string {
    return this.abstractDeliverablePath(project, deliverable) + 'deliverable.json';
  }

  deliverableSingleFilePathForPerson ( project: Project, deliverable: Deliverable, person: Person ): string {
    return this.deliverablePathForPerson(project, deliverable, person) + deliverable.file;
  }

  deliverableConfigPathForPerson ( project: Project, deliverable: Deliverable, person: Person ): string {
    return this.deliverablePathForPerson(project, deliverable, person) + 'deliverable.json';
  }

}
