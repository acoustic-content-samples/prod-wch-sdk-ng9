/**
 * Services and components for Angular based Acoustic Content SPAs.
 *
 * @packageDocumentation
 */

export { PageComponent } from './lib/components/page/page.component';
export {
  LayoutComponent,
  LayoutMapping
} from './lib/decorators/layout/layout.decorator';
export {
  LayoutComponentDirective,
  LayoutMappingDirective,
  RenderingContextDirective
} from './lib/decorators/layout/layout.directive';
export { WchSelectFirstRootPageGuard } from './lib/guards/root.page.guard';
export { AcNgComponentsModule } from './lib/modules/components.module';
export { AcNgLoggerModule } from './lib/modules/logger.module';
export { AcNgProtectedContentModule } from './lib/modules/protected.content.module';
export { AcNgRouterModule } from './lib/modules/router.module';
export { AcNgSearchModule } from './lib/modules/search.module';
export { AcNgServicesModule } from './lib/modules/services.module';
export { VERSION } from './version';
