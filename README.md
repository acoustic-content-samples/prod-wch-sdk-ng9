Implementation of general purpose components for use in the content editor, sites or other projects.

## Philosophy

This repo contains many modules that are inter-related. The idea is that each module represents a logical, self-contained component. Consumers can decide to only depend on a subset of the functionality by pulling in just the required set of modules, without having to worry to pull in too many, undesired dependencies.

The major version number of the repo (and all of its components) follows the major version number of [Angular](https://angular.io/) and the related tooling. Minor version numbers follow the [semantic versioning](https://semver.org/) guidelines and the patch level is the build number assigned by the CI tooling.

None of these modules contains end-user facing UI. The modules are meant to implement or facilitate implementing the business logic layer of an application, without making assumptions on the visual realization.

If a module has a dependency on a particular UI framework such as [Angular](https://angular.io/) or [React](https://reactjs.org/) then we typically split the functionality out into multiple modules

- a framework independent API module for constants and interfaces. This module is shared by different UI frameworks
- a framework specific API module. This one typically references the framework independent one and adds framework dependent aspects such as dependency injection tokens, etc
- a framework independent implementation module containing as much code that can be shared across frameworks as possible
- a framework specific implementation module. This ony typically only contains the framework bindings (e.g. dependency injection) and would dispatch to the framework independent layer

This split makes sense because we want the framework specific modules to make use of the programming concepts of the framework of choice as much as possible. A consumer of the module should find the best practices of the framework represented and not face a custom abstraction that feels alien to the framework. A good example is dependency injection. For [Angular](https://angular.io/) we fully embrace the built in DI approach, all services are provides as [ngModule](https://angular.io/guide/ngmodules)s and [injectable](https://angular.io/api/core/Injectable) services. For [React](https://reactjs.org/) we rely on the [React Context](https://reactjs.org/docs/context.html) to provide our services. But despite the fundamentally differnt ways to expose and consume services, their implementation is largely the same, kept in the framework independent layer.

## Repository structure

The repository is organized as a [monorepo](https://en.wikipedia.org/wiki/Monorepo) that contains of multiple npm packages. Each package implements one particular logical aspect. The repo uses [yarn workspaces](https://yarnpkg.com/lang/en/docs/workspaces/) to manage its build and deployment tasks.

At build and development time all packages use a central copy of `npm_modules`, this significantly reduces the overall footprint and build times. The `scripts/prebuild.ts` script makes sure that all components reference the same version of external dependencies, so the whole set of components is consistent within itself.

## Build

Call `yarn build` to build all packages. This uses `yarn workspaces` to build components in parallel if possible.

### Prebuild

The prebuild step makes sure that ...

- ... the version numbers of all components match the build version. Also there is a `VERSION` constant in each component that can be used for debugging purposes and the prebuild step makes sure that this constant carries the correct version information and build date
- ... the versions of the dependencies match the versions managed top level, so all components are consistent

### Build

The build generates npm packages for each component. These packages will reside in the `dist` folder of the components. The build can be run locally by calling `yarn build` or as part of the CI pipeline. In the CI case it runs the build inside a docker container for isolation and performance reasons.

### Postbuild

The postbuild step makes sure that ...

- ... the `metadata.json` file is removed from those packages that are not [Angular](https://angular.io/) packages. This will significantly speed up their use in [Ivy](https://angular.io/guide/ivy) based projects
- ... the dependencies and peer dependencies are correct. The postbuild step will analyze the generated code to find references and will setup dependencies and peer dependencies accordingly. We can only do this as a postbuild step, since we need the build result for the analysis. From time to time it is advisable to run a full build locally and to checkin the resulting changes.
- ... the [public API](https://www.npmjs.com/package/@microsoft/api-extractor) gets extracted and [documented](https://www.npmjs.com/package/@microsoft/api-documenter).

## Publish

All components are published to http://wats-repob.devlab.ibm.com/ after the build process by the CI pipeline.

In addition we publish the complete content of the built monorepo as `prod-wch-sdk-ng9` to http://wats-repob.devlab.ibm.com/. This step simplifies auditing, change detection and publishing to the global [NPM registry](https://www.npmjs.com/).

### Release to Global NPM

In order to make the packages available to customers they are published to the he global [NPM registry](https://www.npmjs.com/). Use the following command to achieve this (note that `npx` is NOT a typo):

```bash
npx prod-wch-sdk-ng9
```

This command loads the full and consistent set of modules for the latest version from the internal registry and publishes them globally. In order to publish a particular version run

```bash
npx prod-wch-sdk-ng9@<VERSION>
```

## Modules

Each package in the [monorepo](https://en.wikipedia.org/wiki/Monorepo) will compile to an [npm module](https://docs.npmjs.com/about-packages-and-modules) in [Angular Package Format](https://goo.gl/jB3GVv). This format does not limit the use of the packages to [Angular](https://angular.io/) in any way but instead exposes the source code in a variety of formats, so the components can be optimally used in a variety of environments.

In particular each module contains [typings](https://www.typescriptlang.org/docs/handbook/declaration-files/publishing.html), an UMD version so the can be used without a compile step and a [tree-shakeable version](https://github.com/nodejs/node-eps/blob/4217dca299d89c8c18ac44c878b5fe9581974ef3/002-es6-modules.md#51-determining-if-source-is-an-es-module).

## Documentation

Each module carries its own documentation as part of [JSDoc](https://api-extractor.com/pages/setup/generating_docs/) comments, so documentation is available in the IDE using the components. Also the build process uses [api-documenter](https://www.npmjs.com/package/@microsoft/api-documenter) to generate an API overview as part of the `README` of each component. This documentation is available directly on the [npm](https://www.npmjs.com/) page for the individual component.

## Dependencies

All modules that are meant to be consumed by applications (in contrast to the CLI modules) are using the following dependency strategy:

- if a components depends on a component from this [monorepo](https://en.wikipedia.org/wiki/Monorepo) then it uses a `dependency` and an explicit version number. So all components will reference each other consistently in exactly that version number. It is the `prebuild` step in the CI environment that guarantees this. Make sure that the source code always uses `MAJOR.0.0` for all internal dependencies.
- if a component has an external dependency, then this will be a `peerDependency`. This makes sure that consumers will not accidentially pull in multiple copies of a dependency. This repo tries to avoid external dependencies as much as possible, other than dependencies on frameworks such as [Angular](https://angular.io/) or [React](https://reactjs.org/).
