import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';

import {FIREBASE_PROVIDERS, defaultFirebase, AngularFire} from 'angularfire2';

import { JakeBillingsAppComponent, environment } from './app/index';

if (environment.production) {
  enableProdMode();
}

bootstrap(JakeBillingsAppComponent,[
  FIREBASE_PROVIDERS,
  defaultFirebase('https://eakjb-jake-billings.firebaseIO.com')
]);

