import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Portfolio } from '../pages/portfolio/portfolio';
import { Calculators } from '../pages/calculators/calculators';
import { TrollboxPage } from '../pages/trollbox/trollbox';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MiningCalculatorPage } from '../pages/mining-calculator/mining-calculator';

@NgModule({
  declarations: [
    MyApp,
    Portfolio,
    Calculators,
    TrollboxPage,
    MiningCalculatorPage,
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Portfolio,
    Calculators,
    TrollboxPage,
    MiningCalculatorPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
