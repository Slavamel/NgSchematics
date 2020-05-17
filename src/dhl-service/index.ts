import { Rule, SchematicContext, Tree, url, mergeWith, apply, template, SchematicsException, move } from '@angular-devkit/schematics';
import { parseName } from '@schematics/angular/utility/parse-name';
import { buildDefaultPath } from '@schematics/angular/utility/project';

import { strings } from '@angular-devkit/core';
import { Schema } from './schema';


// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function dhlService(_options: Schema): Rule {
  return (_tree: Tree, _context: SchematicContext) => {
    const workspaceConfigBuilder = _tree.read("angular.json");
    if (!workspaceConfigBuilder) {
      throw new SchematicsException("Not an Angular CLI workspace");
    }

    const workspaceConfig = JSON.parse(workspaceConfigBuilder.toString());
    const project = workspaceConfig.projects[workspaceConfig.defaultProject];

    const defaultProjectPath = buildDefaultPath(project) + "/services";

    const parsedPath = parseName(defaultProjectPath, _options.name);

    const { name, path } = parsedPath;

    const sourceTemplates = url('./files');

    const sourceParametrizedTemplates = apply(sourceTemplates, [
      template({
        ..._options,
        ...strings,
        name
      }),
      move(path)
    ])

    
    return mergeWith(sourceParametrizedTemplates)(_tree, _context);
  };
}
