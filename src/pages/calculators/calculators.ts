import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { MiningCalculatorPage } from '../mining-calculator/mining-calculator';

class InvestmentCalculator {
  costOfBuying: number = 0;
  totalSaleInvestment: number = 0;
  amountCurrency: number = 0;

  constructor(public investmentAmount: number = 1000, public costPerCurrency = 0.00003102, 
    public priceToSellInvestment: number = 0.046) {
  }

  roiInvestment = function() {
      this.amountCurrency = Math.floor(this.investmentAmount/this.costPerCurrency);
      this.costOfBuying = this.amountCurrency * this.costPerCurrency;
      this.totalSaleInvestment = this.amountCurrency * this.priceToSellInvestment;
      this.profitInvestment = this.totalSaleInvestment - this.costOfBuying;
      return this.profitInvestment * 100 / this.costOfBuying;
  };
}

@Component({
  selector: 'page-calculators',
  templateUrl: 'calculators.html'
})
export class Calculators {
  selectedItem: any;
  icons: string[];
  calculators: string[];
  items: Array<{title: string, note: string, icon: string}>;
  investmentCalculator: InvestmentCalculator;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    // Let's populate this page with some filler content for funzies
    this.calculators = ['Mining', 'Investment'];

    this.investmentCalculator = new InvestmentCalculator();

    this.items = [];
    for (let i = 0; i < 2; i++) {
      this.items.push({
        title: this.calculators[i],
        note: this.calculators[i],
        icon: 'calculator'
      });
    }
  }

  itemTapped(event, item) {
    if (item.title == 'Mining') {
        this.navCtrl.push(MiningCalculatorPage, {
        item: item
      });
    }
    else {
      this.navCtrl.push(Calculators, {
        item: item
      });
    }
    
  }
}
