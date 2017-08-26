import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

import { Configuration, Course } from '../definitions/definitions';

@Injectable()
export class ConfigurationService {

  private configuration: Configuration;

  constructor ( private http: HttpClient ) {}

  load (): Promise<Configuration> {
    if (this.configuration) {
      return Promise.resolve(this.configuration);
    }
    return this.http.get('/assets/config.json')
      .toPromise()
      .then( (configuration: Configuration) => this.configuration = configuration );
  }

  course (): Promise<Course> {
    return this.load()
      .then( (configuration: Configuration) => configuration.course );
  }
}
