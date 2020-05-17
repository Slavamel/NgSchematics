import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { <%= classify(name) %>ServiceBase } from './<%= dasherize(name) %>.service.base';
import { environment } from 'src/environments/environment';

@Injectable()
export class <%= classify(name) %>ServiceReal extends <%= classify(name) %>ServiceBase {
  constructor(private http: HttpClient) {
    super();
  }
<% if (!methods) { %>
  delete<%= classify(name) %>(id: number): Promise<boolean> {
    return this.http.delete<boolean>(`${environment.url}/delete<%= classify(name) %>`).toPromise();
  }

  get<%= classify(name) %>(id: number): Promise<<%= classify(name) %>> {
    return this.http.get<<%= classify(name) %>>(`${environment.url}/get<%= classify(name) %>`).toPromise();
  }

  getAll<%= classify(name) %>s(): Promise<<%= classify(name) %>[]> {
    return this.http.get<<%= classify(name) %>[]>(`${environment.url}/getAll<%= classify(name) %>s`).toPromise();
  }

  update<%= classify(name) %>(<%= camelize(name) %>: <%= classify(name) %>): Promise<<%= classify(name) %>> {
    return this.http.post<<%= classify(name) %>>(`${environment.url}/get<%= classify(name) %>`, <%= camelize(name) %>).toPromise();
  }
<% } else { %>
<% for (let methodName of methods.split(",")) { %>
  <%= camelize(methodName) %>(): Promise<any> {
    throw new Exception("Not implemented");
  }
<% } %><% } %>
}