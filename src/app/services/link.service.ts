import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

import { Project, Deliverable, Person, DeliverableConfig } from '../definitions/definitions';

@Injectable()
export class LinkService {

  constructor ( private http: HttpClient ) {}

  check (url): Promise<boolean> {
    return this.http.get(url, {responseType: 'text'})
      .toPromise()
      .then( () => true )
      .catch( () => false );
  }

  loadDeliverableConfig (deliverablePath): Promise<DeliverableConfig> {
    return this.http.get(deliverablePath)
      .toPromise()
      .catch( () => undefined );
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
