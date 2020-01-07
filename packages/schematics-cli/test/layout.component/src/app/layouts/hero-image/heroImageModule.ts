import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { WchNgComponentsModule } from '@acoustic-content-sdk/ng';

import { HeroImageLayoutComponent } from './heroImageLayout';

@NgModule({
    /**
    * TODO explicitly add those modules that are used by the layout
    */
    imports: [
        CommonModule,
        WchNgComponentsModule
    ],
    declarations: [HeroImageLayoutComponent],
    exports: [HeroImageLayoutComponent],
    entryComponents: [HeroImageLayoutComponent]
})
export class HeroImageModule {
}
