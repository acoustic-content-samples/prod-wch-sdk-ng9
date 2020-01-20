import { RenderingContextElements, RenderingContextV2 } from '@acoustic-content-sdk/api';
import { LayoutComponent } from '@acoustic-content-sdk/ng';
import { AbstractRenderingComponent } from '@acoustic-content-sdk/ng-utils';
import { rxPipe, rxSelectProperty } from '@acoustic-content-sdk/utils';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck, scan } from 'rxjs/operators';

@LayoutComponent({
  selector: 'page-layout'
})
@Component({
  selector: 'app-page-layout',
  templateUrl: './page.layout.component.html',
  styleUrls: ['./page.layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageLayoutComponent extends AbstractRenderingComponent {
  title$: Observable<string>;

  content$: Observable<RenderingContextElements>;

  count$: Observable<number>;

  constructor() {
    super();

    // context
    const rc$ = this.renderingContext$;

    this.count$ = rxPipe(rc$, scan((count: number, rc: RenderingContextV2) => count + 1, 0));
    this.title$ = rxPipe(this.renderingContext$, pluck('descriptor', 'title'));
    this.content$ = rxPipe(this.renderingContext$, rxSelectProperty('content'));
  }
}
