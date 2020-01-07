import { Logger, LoggerService } from '@acoustic-content-sdk/api';
import { WCH_TOKEN_LOGGER_SERVICE } from '@acoustic-content-sdk/ng-api';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng';

  constructor(@Inject(WCH_TOKEN_LOGGER_SERVICE) aLogger: LoggerService) {
    const log: Logger = aLogger.get('test');
    log.info('bootstrap');

    console.log('AppComponent');
  }
}
