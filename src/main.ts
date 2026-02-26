import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .then(() => {
    console.log('Chess Nexus app bootstrapped successfully');
  })
  .catch((err) => {
    console.error('Failed to bootstrap app:', err);
    document.body.innerHTML = `<div style="color:white;padding:40px;font-family:sans-serif;">
      <h1>Chess Nexus - Loading Error</h1>
      <p>The app failed to start. Check the browser console for details.</p>
      <pre style="color:#ff6b6b;">${err?.message || err}</pre>
    </div>`;
  });
