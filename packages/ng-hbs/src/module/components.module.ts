import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HandlebarsComponent } from '../components/hbs-edit/hbs.component';

@NgModule({
  imports: [CommonModule],
  declarations: [HandlebarsComponent],
  exports: [HandlebarsComponent],
  entryComponents: [HandlebarsComponent]
})
export class WchNgHbsComponentsEditModule {}
