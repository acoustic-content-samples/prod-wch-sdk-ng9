[![npm](https://img.shields.io/npm/v/@acoustic-content-sdk/ng-app-base.svg?style=flat-square)](https://www.npmjs.com/package/@acoustic-content-sdk/ng-app-base)

Convenience module to pull in generic application dependencies that are required both in live and preview mode. You might want to use this module in the basic application module to pull in the typical SDK dependencies.

**Example**:

```typescript
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes, { useHash: false }),
    WchNgAppBaseModule,
    ...MODULES
  ]
})
export class AppModule {}
```

[API Documentation](./markdown/ng-app-base.md)
