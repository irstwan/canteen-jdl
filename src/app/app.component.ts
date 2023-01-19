import { Component } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {environment} from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'canteen-jdl';

  constructor() {
    // Initialize Firebase
    const app = initializeApp(environment.firebaseConfig);
    const analytics = getAnalytics(app);
  }
}
