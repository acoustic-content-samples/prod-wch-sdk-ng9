import {
    LayoutComponent
} from '@acoustic-content-sdk/ng';
import { Component } from '@angular/core';
import { TypeHeroImageComponent } from './../../components/hero-image/typeHeroImageComponent';

/** Useful imports */
// import { map, takeUntil, distinctUntilChanged } from 'rxjs/operators';

/*
 * @name Hero image
 * @id hero-image-layout
 */
@LayoutComponent({
    selector: 'hero-image-layout'
})
@Component({
  /**
  * Consider to code your component such that all elements will be immutable and that it only
  * depends on its inputs. This can e.g. be achieved by basing all state changes on observables.
  *
  * @see https://angular-2-training-book.rangle.io/handout/change-detection/change_detection_strategy_onpush.html
  *
  * import { ChangeDetectionStrategy } from '@angular/core';
  */
  // changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-hero-image-layout-component',
  templateUrl: './heroImageLayout.html',
  styleUrls: ['./heroImageLayout.scss'],
  preserveWhitespaces: false
})
export class HeroImageLayoutComponent extends TypeHeroImageComponent {

    /*
     * TODO add custom fields here. These fields should be those
     * specific to this layout.
     */

    constructor() {
        super();
    }

}
