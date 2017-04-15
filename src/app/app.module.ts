import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';

import { Portfolio } from '../pages/portfolio/portfolio';
import { Calculators } from '../pages/calculators/calculators';
import { TrollboxPage } from '../pages/trollbox/trollbox';
import { InvestmentDetailPage } from '../pages/investment-detail/investment-detail';
import { Polo } from '../providers/polo';
import { PoloData } from '../providers/polo-data';
import { PowerMonthlyPage } from '../pages/power-monthly/power-monthly';
import { RigsNeededPage } from '../pages/rigs-needed/rigs-needed';
import { CostToMineCoinPage } from '../pages/cost-to-mine-coin/cost-to-mine-coin';
import { InvestmentCalculatorPage } from '../pages/investment-calculator/investment-calculator';
import { MiningCalculatorPage } from '../pages/mining-calculator/mining-calculator';


@NgModule({
  declarations: [
    MyApp,
    Portfolio,
    Calculators,
    TrollboxPage,
    InvestmentDetailPage,
    PowerMonthlyPage,
    RigsNeededPage,
    CostToMineCoinPage,
    InvestmentCalculatorPage,
    MiningCalculatorPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Portfolio,
    Calculators,
    TrollboxPage,
    InvestmentDetailPage,
    PowerMonthlyPage,
    RigsNeededPage,
    CostToMineCoinPage,
    InvestmentCalculatorPage,
    MiningCalculatorPage
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
