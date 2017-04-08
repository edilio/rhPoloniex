import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Portfolio } from '../pages/portfolio/portfolio';
import { Calculators } from '../pages/calculators/calculators';
import { TrollboxPage } from '../pages/trollbox/trollbox';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//import { MiningCalculatorPage } from '../pages/mining-calculator/mining-calculator';
//import { InvestmentCalculatorPage } from '../pages/investment-calculator/investment-calculator';
import { InvestmentDetailPage } from '../pages/investment-detail/investment-detail';
import { Polo } from '../providers/polo';
import { PoloData } from '../providers/polo-data';

@NgModule({
  declarations: [
    MyApp,
    Portfolio,
    Calculators,
    TrollboxPage,
    InvestmentDetailPage
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
    InvestmentDetailPage,
  ],
  providers: [
    PoloData,
    Polo,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
