import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

document.addEventListener('DOMContentLoaded', () => {
  platformBrowserDynamic().bootstrapModule(AppModule).then(ref => {
    // Ensure Angular destroys itself on hot reloads.
    if (window['ngRef']) {
      window['ngRef'].destroy();
    }
    window['ngRef'] = ref;
  
    // Otherise, log the boot error
  })
  .catch(err => console.log(err));
});

// document.addEventListener('DOMContentLoaded', () => {
//   platformBrowserDynamic().bootstrapModule(AppModule).then(ref => {
//     // Ensure Angular destroys itself on hot reloads.
//     console.log("referance ",ref)
//     if (window['ngRef']) {
//       window['ngRef'].destroy();
//     }
//     window['ngRef'] = ref;
  
//     // Otherwise, log the boot error
//   }).catch(err => console.error(err));
  
// });

// window.addEventListener('beforeunload', (event) => {
//   event.returnValue = `You have unsaved changes, leave anyway?`;
//   console.log("event",event.returnValue)
// });