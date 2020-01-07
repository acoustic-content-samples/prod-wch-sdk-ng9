# @acoustic-content-sdk/redux-store

Implementation of a [Redux](https://redux.js.org/api/store) store with support for adding feature modules, dynamically.

## Providing a feature module

Create and export an instance of `ReduxFeatureModule` for your module.

### Example

```typescript
import {
  ReduxFeatureModule,
  createReduxFeatureModule
} from 'prod-publishing-redux-store';

import { sampleEpic } from './feature.epics';
import { sampleReducer } from './feature.reducer';
import { SampleFeatureState } from './feature.state';

export const sampleFeature = createReduxFeatureModule(
  'SAMPLE_FEATURE',
  sampleReducer,
  sampleEpic
);
```

In some cases a feature module depends on the existence on other feature modules, e.g. because an [epic](https://redux-observable.js.org/docs/basics/Epics.html) might require it. In this case list the modules the feature modules depends on in the `dependencies` parameter:

```typescript
import {
  ReduxFeatureModule,
  createReduxFeatureModule
} from 'prod-publishing-redux-store';

import { sampleEpic } from './feature.epics';
import { sampleReducer } from './feature.reducer';
import { SampleFeatureState } from './feature.state';

export const sampleFeature = createReduxFeatureModule(
  'SAMPLE_FEATURE',
  sampleReducer,
  sampleEpic,
  [depModule1, depModule2, depModule3]
);
```

## Registering a feature module

Register the feature module with the root store using the `addFeatureModule` method. This will also register all dependent modules in topology order.

```typescript
import {
  ReduxRootStore
} from 'prod-publishing-redux-store';

const store: ReduxRootStore = ...;

store.addFeatureModule(sampleFeature);
```

## Consuming a feature module

Use the `selectFeature` method to create a selector for the desired feature.

### Example

```typescript
import { selectFeature } from 'prod-publishing-redux-store';

const selectSample = selectFeature(sampleFeature);
```

## Side effects in Feature Modules

Feature modules may provide side effects ([Epics](https://redux-observable.js.org/docs/basics/Epics.html)) for asynchronous processing. Sometimes such epics require an initialization event to execute bootstrapping logic. The store sends an initialization event for this purpose, after a feature module has been initialized. Use the `ofInitFeature` method to subscribe to this event.

### Example

```typescript
import { ofInitFeature } from 'prod-publishing-redux-store';

const initEpic: Epic = (actions$) =>
  actions$.pipe(ofInitFeature(sampleFeature), map(...));
```

## API Documentation

Refer to the [API documentation](./markdown/prod-publishing-redux-store.md).
