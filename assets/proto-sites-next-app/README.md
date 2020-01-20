Sample application for sites-v2

## Status

- application is only enabled for edit mode so far
- enablement for view mode should not require code changes to the components but only changes in the injected dependencies

## Start

The application in edit-mode runs in a *shell* that fetches all data and communicates it via inter-frame messages.

Start this application on port `4200` for local development.

```bash
yarn install
yarn start
```

Then start a compatible application, e.g. `https://github.com/aipoweredmarketer/proto-sites-next-app`

## Build

The application build generates content items and assets. 

The `assets` are the compiled application binaries such as `js` files and `css` files.

The `content items` are theme contributions that will be pulled in by the page.

```bash
yarn build:prod
```

Builds the application in production mode.

## Deployment

After building the app, deploy the `dist/data` folder using `wchtools`. This is done by the Jenkins CI/CD pipeline, automatically.

In addition the pipeline deployes a zipped version of the `dist/data` folder to `https://na.artifactory.swg-devops.com/artifactory/wce-wch-generic-local/proto-sites-next-app/`. This can then be downloaded and deployed, manually if desired.



