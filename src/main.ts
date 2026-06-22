import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDZfTQ2tAMFiGvo5aUDAeSVvq3WOsUXEBA",
  authDomain: "projeto-sos-df03a.firebaseapp.com",
  projectId: "projeto-sos-df03a",
  storageBucket: "projeto-sos-df03a.firebasestorage.app",
  messagingSenderId: "57830393070",
  appId: "1:57830393070:web:3547d48d0a2ba3f40e5fff",
  measurementId: "G-3R6FHDFMG3"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(), 
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient()
  ],
});
