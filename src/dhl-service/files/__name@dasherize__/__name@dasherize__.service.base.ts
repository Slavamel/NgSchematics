import { Injectable } from '@angular/core';

@Injectable()
export abstract class <%= classify(name) %>ServiceBase {
<% if (!methods) { %>
  abstract delete<%= classify(name) %>(id: number): Promise<boolean>;
  abstract get<%= classify(name) %>(id: number): Promise<<%= classify(name) %>>;
  abstract getAll<%= classify(name) %>s(): Promise<<%= classify(name) %>[]>;
  abstract update<%= classify(name) %>(<%= camelize(name) %>: <%= classify(name) %>): Promise<<%= classify(name) %>>;
<% } else { %>
<% for (let methodName of methods.split(",")) { %>
  abstract <%= camelize(methodName) %>(): Promise<<%= classify(name) %>>;
<% } %><% } %>
}