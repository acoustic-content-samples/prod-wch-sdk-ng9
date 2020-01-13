import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HandlebarsComponent } from '../components/hbs-view/hbs.component';

@NgModule({
  imports: [CommonModule],
  declarations: [HandlebarsComponent],
  exports: [HandlebarsComponent],
  entryComponents: [HandlebarsComponent]
})
export class WchNgHbsComponentsViewModule {}
