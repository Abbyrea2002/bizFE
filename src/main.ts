import { provideAuth0 } from '@auth0/auth0-angular';
import { provideHttpClient } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, {
  providers: [
    provideAuth0({
      domain: "dev-os6ypfqp16gmivgg.us.auth0.com",
      clientId: "Ddo15HhyRMQXRWv4bPZBtE3yrR9iKQ4V",
      authorizationParams: {
        redirect_uri: window.location.origin,
      }
    }),
    provideHttpClient(),
    appConfig.providers
  ]
}).catch((err) => console.error(err));
