import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

import { DeliverableConfig } from '../definitions/definitions';

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

}
