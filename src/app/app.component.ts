import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Portfolio } from '../pages/portfolio/portfolio';
import { Calculators } from '../pages/calculators/calculators';
import { TrollboxPage } from '../pages/trollbox/trollbox'; 
//import { CostToMineCoinPage } from '../pages/cost-to-mine-coin/cost-to-mine-coin';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = Portfolio;

  pages: Array<{title: string, component: any, icon: string}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Portfolio', component: Portfolio, icon: 'briefcase' },
      { title: 'Calculators', component: Calculators , icon: 'calculator' },
      { title: 'Trollbox', component: TrollboxPage , icon: 'chatboxes' }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
