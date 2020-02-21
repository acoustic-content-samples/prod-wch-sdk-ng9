import { Logger, LoggerService } from '@acoustic-content-sdk/api';
import { ACOUSTIC_TOKEN_LOGGER_SERVICE } from '@acoustic-content-sdk/ng-api';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng';

  constructor(@Inject(ACOUSTIC_TOKEN_LOGGER_SERVICE) aLogger: LoggerService) {
    const log: Logger = aLogger.get('test');
    log.info('bootstrap');

    console.log('AppComponent');
  }
}
