[![npm](https://img.shields.io/npm/v/@acoustic-content-sdk/schematics-feature-module.svg?style=flat-square)](https://www.npmjs.com/package/@acoustic-content-sdk/schematics-feature-module)

Schematic to add a feature module to an application.

## Usage

The package addresses the following usecaes

### Implement the `ng-add` schematics for feature modules

The modules exposes the `addFeatureModuleToApplication` schematic that can be used as a general purpose implementation of the [ng-add](https://angular.io/cli/add) schematic. The implementation will add the [ngModule](https://angular.io/guide/ngmodules) of a feature module to the main application.

Use the following [ng-generate](https://angular.io/cli/generate) schematic to add [ng-add](https://angular.io/cli/add) support to your feature module.

### Add support for the `ng-add` schematics to a feature module

For a feature module add the following command to add support for the [ng-add](https://angular.io/cli/add) schematic:

```bash
ng generate @acoustic-content-sdk/schematics-feature-module.schematics --module MODULE_NAME
```

Where `MODULE_NAME` is the name of the module you'd like to have added.

The result of this command is the registration of an [ng-add](https://angular.io/cli/add) for the module, so the module can be added to another application via:

```bash
ng add YOUR_NPM_PACKAGE_NAME
```

## Documentation

[API Documentation](./markdown/schematics-feature-module.md)
