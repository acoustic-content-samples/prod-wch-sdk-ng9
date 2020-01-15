[![npm](https://img.shields.io/npm/v/@acoustic-content-sdk/app.svg?style=flat-square)](https://www.npmjs.com/package/@acoustic-content-sdk/app)

This [schematics](https://www.npmjs.com/package/@angular-devkit/schematics) allows to add [Acoustic Content SDK](https://www.npmjs.com/package/@acoustic-content-sdk/ng) support to your Angular application.

## Prereq

- Install the [Angular CLI](https://cli.angular.io/)
- Make sure you have an Angular project set up

## Usage

From the command line from within you application folder run

```bash
npx ng add @acoustic-content-sdk/app
```

This will ask for the [API_URL](https://developer.ibm.com/customer-engagement/tutorials/getting-started-api-javascript/#tocstep1) of your Acoustic Content tenant.

The command will add the [Acoustic Content SDK](https://www.npmjs.com/package/@acoustic-content-sdk/ng) to your project and install the required dependencies.

## Next Steps

- Consult [@acoustic-content-sdk/schematics](https://www.npmjs.com/package/@acoustic-content-sdk/schematics) for a list of commands that you can use to develop your Acoustic Content application.
- Follow the [guide](https://www.npmjs.com/package/@acoustic-content-sdk/ng) to begin writing awesome applications for [Acoustic Content](https://www.ibm.com/products/watson-content-hub).

## Concepts

An application built for [Acoustic Content](https://www.ibm.com/products/watson-content-hub) is delivered in two versions, a `view` and an `edit` version. The versions differ in the set of modules they pull in from the [Acoustic Content SDK](https://www.npmjs.com/package/@acoustic-content-sdk/ng) at application bootstrap time, the actual application code, i.e. the application components are identical between these versions.

The split makes sense, because the `edit` version enables inline edit features for the application and this requires to pull in more dependencies than there are required for an application without edit capabilities. So the application build for `edit` is larger than that for `view`. It is important however to keep the application size for `view` as small as possible to deliver the best application performance possible. Hence the split.

The different build versions are represented as `configurations` in the `angular.json` file. You can e.g. build the application in view mode for production calling `ng build --configuration=production,view` or in edit mode `ng build --configuration=production,edit`. The same overlay technique works for other [build targets](https://angular.io/cli/build).

## Documentation

[API Documentation](./markdown/app.md)
