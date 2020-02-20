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
export { WchNgComponentsModule } from './lib/modules/components.module';
export { WchNgLoggerModule } from './lib/modules/logger.module';
export { WchNgProtectedContentModule } from './lib/modules/protected.content.module';
export { WchNgRouterModule } from './lib/modules/router.module';
export { WchNgSearchModule } from './lib/modules/search.module';
export { WchNgServicesModule } from './lib/modules/services.module';
export { VERSION } from './version';
