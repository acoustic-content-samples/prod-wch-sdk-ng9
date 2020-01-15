# WCH SDK Schematics

These [schematics](https://www.npmjs.com/package/@angular-devkit/schematics) add workflow to application development for Angular applications for [Watson Content Hub](https://www.ibm.com/products/watson-content-hub).

### Suggestion

You might want to bootstrap your application by using the [@acoustic-content-sdk/app](https://www.npmjs.com/package/@acoustic-content-sdk/app) schematics.

## Prereq

- Install the [Angular CLI](https://cli.angular.io/)
- Make sure you have an Angular project set up

## Installation

If you have bootstrapped your application with [@acoustic-content-sdk/app](https://www.npmjs.com/package/@acoustic-content-sdk/app) no extra installation step is required.

Otherwise from the command line from within you application folder run

```bash
npm install --dev @acoustic-content-sdk/schematics
```

## Basic usage

The schematics integrate with the `ng generate` command and use the following syntax:

```bash
npx ng generate @acoustic-content-sdk/schematics:<COMMAND> <OPTIONS>
```

You can get help on the supported options for a particular command via

```bash
npx ng generate @acoustic-content-sdk/schematics:<COMMAND> --help
```

## Commands

The following commands are supported:

### Layouts

Generates layouts and layout mappings based on type information in a batch in the wchtools folder. The names of the artifacts are derived from the type names.

```bash
npx ng generate @acoustic-content-sdk/schematics:layouts
```

This command only generates the JSON descriptors for layouts and mappings, no code components. It works on top of the wchtools folder and assumes the existence of JSON records for content types.

### Layout

Generates a layout and layout mapping for one type. The name of the desired layout can be specified.

```bash
npx ng generate @acoustic-content-sdk/schematics:layout <NAME>
```

This command only generates the JSON descriptors for layouts and mappings, no code components. Use this command to create additional layouts to the auto generated ones, when the default naming mechanism is not sufficient.

### Components

Generates angular layouts and components based on a wchtools folder. Uses information from the content types, layout and layout mappings.

```bash
npx ng generate @acoustic-content-sdk/schematics:components
```

This command creates Angular components that represent the mapped layouts from the wchtools folder. The command is designed to work in batch mode and should be called whenever layouts, layout mappings or types change.

## WCH Tools Folder

Many command operate on top of a [wchtools folder](https://www.npmjs.com/package/wchtools-cli), that contains the WCH content model in form of JSON records. This folder is typically maintained by calling [wchtools](https://www.npmjs.com/package/wchtools-cli) commands, e.g. `wchtools pull -t`.

The location of the [wchtools folder](https://www.npmjs.com/package/wchtools-cli) folder can be configured via the `package.json` in the `config.data` field, relative to the location of the `package.json`, we recommend `./data` as the default name of this folder. Specify additional configuration in the `./data/.wchtoolsoptions.json` inside that folder.

If you have bootstrapped your application with [@acoustic-content-sdk/app](https://www.npmjs.com/package/@acoustic-content-sdk/app) then the folder and necessary configuration will be setup, already.
