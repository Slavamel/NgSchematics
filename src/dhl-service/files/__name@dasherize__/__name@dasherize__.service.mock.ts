import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { <%= classify(name) %>ServiceBase } from './<%= dasherize(name) %>.service.base';

@Injectable()
export class <%= classify(name) %>ServiceMock extends <%= classify(name) %>ServiceBase {
  constructor(private http: HttpClient) {
    super();
  }
<% if (!methods) { %>
  delete<%= classify(name) %>(id: number): Promise<boolean> {
    return new Promise((resolve) => resolve(true));
  }

  get<%= classify(name) %>(id: number): Promise<<%= classify(name) %>> {
    return this.http.get<<%= classify(name) %>>('assets/mocks/get<%= classify(name) %>.json').toPromise();
  }

  getAll<%= classify(name) %>s(): Promise<<%= classify(name) %>[]> {
    return this.http.get<<%= classify(name) %>[]>('assets/mocks/getAll<%= classify(name) %>s.json').toPromise();
  }

  update<%= classify(name) %>(<%= camelize(name) %>: <%= classify(name) %>): Promise<<%= classify(name) %>> {
    return this.http.get<<%= classify(name) %>>('assets/mocks/get<%= classify(name) %>.json').toPromise();
  }
<% } else { %>
<% for (let methodName of methods.split(",")) { %>
  <%= camelize(methodName) %>(): Promise<<%= classify(name) %>> {
    return this.http.get<<%= classify(name) %>>('assets/mocks/get<%= classify(methodName) %>.json').toPromise();
  }
<% } %><% } %>
}