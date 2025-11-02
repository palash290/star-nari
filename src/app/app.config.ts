import { ApplicationConfig } from '@angular/core';
import { InMemoryScrollingOptions, provideRouter, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HttpInterceptorService } from './interceptors/http.interceptor';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
const firebaseConfig = {
apiKey: "AIzaSyBHhUuJmVp97wLaEKk0d0TzDrxL_AQA5Ng",
  authDomain: "star-nari.firebaseapp.com",
  projectId: "star-nari",
  storageBucket: "star-nari.firebasestorage.app",
  messagingSenderId: "621479880031",
  appId: "1:621479880031:web:3f19587bc50770614502ea",
  measurementId: "G-W7W442N7WY",
  vapidKey: 'BEth1UNGEwtbRvYprqD72fnfDj1J46db9pD5BoteN7rvaWgN0NHTKwd9l53DfqyUAbXqyTnDyPRcJ3apOXCyrb0'
};
const scrollConfig: InMemoryScrollingOptions = {
  scrollPositionRestoration: 'top',
  anchorScrolling: 'enabled',
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideRouter(routes, withInMemoryScrolling(scrollConfig)),

    provideAnimations(),
    provideHttpClient(
      withInterceptorsFromDi()
    ),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    },
    provideAnimationsAsync(),
  ]
};