Implementation of general purpose components for use in the content editor, sites or other projects.

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

Run `publish:global` locally to publish the packages to global npm.

## Modules

Each package in the [monorepo](https://en.wikipedia.org/wiki/Monorepo) will compile to an [npm module](https://docs.npmjs.com/about-packages-and-modules) in [Angular Package Format](https://goo.gl/jB3GVv). This format does not limit the use of the packages to [Angular](https://angular.io/) in any way but instead exposes the source code in a variety of formats, so the components can be optimally used in a variety of environments.

In particular each module contains [typings](https://www.typescriptlang.org/docs/handbook/declaration-files/publishing.html), an UMD version so the can be used without a compile step and a [tree-shakeable version](https://github.com/nodejs/node-eps/blob/4217dca299d89c8c18ac44c878b5fe9581974ef3/002-es6-modules.md#51-determining-if-source-is-an-es-module).
