# @acoustic-content-sdk/redux-utils

Implementation of utility functions that help working with redux state.

## Immutability

One of the [core principals](https://redux.js.org/introduction/three-principles) of the redux pattern is to keep all state immutable. This implies that when updating a value we need to make a copy of the affected objects. The following functions help to limit the size of these copies.

### Updater

The `createUpdater` creates an wrapper around an object. This wrapper allows to set or remove (deep) properties of the wrapped object without mutating it. The updater makes sure to only create the minimum set of shallow copies.

Example:

```typescript
const myObject={...};
const updater = createUpdater(myObject);

updater.set('elements.text.value', 'newValue');

const newObject = updater.get();
```

The updater works similar to [immer](https://www.npmjs.com/package/immer) but without the overhead.

### Invariance Checks

During development it is important to verify that objects are not getting mutated. Use the invariance checker to test this, but make sure to not include these checks in production builds for performance reasons.

Example:

```typescript
const inv = invarianceChecker(myObject);
// do some operations

// validate that myObject has not been mutated
assert(inv());
```