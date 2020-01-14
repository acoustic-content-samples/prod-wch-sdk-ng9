import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HandlebarsComponent } from '../components/hbs-edit/hbs.component';
import { ReactDirective } from '../directives/react.directive';

/**
 * Module to expose the handlebars rendering component.
 */
@NgModule({
  imports: [CommonModule],
  declarations: [HandlebarsComponent, ReactDirective],
  exports: [HandlebarsComponent],
  entryComponents: [HandlebarsComponent]
})
export class WchNgHbsComponentsEditModule {}
