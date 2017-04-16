import { Component } from '@angular/core';

import { InvestmentCalculatorPage } from '../investment-calculator/investment-calculator';
import { MiningCalculatorPage } from '../mining-calculator/mining-calculator';

import { PowerMonthlyPage } from '../power-monthly/power-monthly';
import { RigsNeededPage } from '../rigs-needed/rigs-needed';
import { CostToMineCoinPage } from '../cost-to-mine-coin/cost-to-mine-coin';


@Component({
  templateUrl: 'calculators.html'
})
export class Calculators {

  tab1Root: any = InvestmentCalculatorPage;
  tab2Root: any = MiningCalculatorPage;
  tab3Root: any = PowerMonthlyPage;
  tab4Root: any = RigsNeededPage;
  tab5Root: any = CostToMineCoinPage;

  constructor() {}
}