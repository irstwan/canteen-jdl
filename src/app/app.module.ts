import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire/compat';
import {AngularFirestoreModule} from '@angular/fire/compat/firestore';
import {AppRoutingModule} from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ServiceWorkerModule, SwRegistrationOptions} from '@angular/service-worker';
import {SharedModule} from './shared/shared.module';
import {TransactionModule} from './transaction/transaction.module';

@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [
        BrowserModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        ServiceWorkerModule.register('ngsw-worker.js'),
        SharedModule,
        TransactionModule
    ],
  providers: [{
    provide: SwRegistrationOptions,
    useFactory: () => {
      return {
        enabled: environment.production,
        registrationStrategy: 'registerImmediately'
      };
    }
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }
