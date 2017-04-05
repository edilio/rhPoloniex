import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

class MiningCalculator {
  xmrPerMiner: number = 0.44;
  moneroGenerated: number = 0;
  totalSale: number = 0;
  totalSaleMinusInvestment: number = 0;
  totalCostOfInvestment: number = 0;
  totalCost: number = 0;
  totalProfit: number = 0;
  roiWithoutRigInvestment: number = 0;

  constructor(
    public noRigs: number = 10, public costPerRig = 1500.00, public hashesRigs: number = 4.1,
    public priceToSell: number = 77, public monthsToMine: number = 6,
    public watts: number = 640, public costPerWatt: number = 0.12) {

  }

  costOfElectricityInMonths = function () {
      this.totalCostOfInvestment = this.noRigs * this.costPerRig;
      this.costOfElectricityMonthly = this.noRigs * this.watts * this.costPerWatt;
      this.moneroGenerated = this.xmrPerMiner * this.noRigs * 30 * this.monthsToMine;
      this.totalSale = this.moneroGenerated * this.priceToSell;
      this.totalSaleMinusInvestment =  this.totalSale - this.totalCostOfInvestment;
      var ret = this.costOfElectricityMonthly * this.monthsToMine;
      this.totalCost = this.totalCostOfInvestment + ret;
      this.totalProfit = this.totalSaleMinusInvestment - ret;
      this.roi = this.totalProfit * 100 / this.totalCost;
      this.profit = this.totalSale - ret;
      this.roiWithoutRigInvestment = this.profit * 100 / ret;

    return ret;
  };
}

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
  miningCalculator: MiningCalculator;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    // Let's populate this page with some filler content for funzies
    this.calculators = ['Mining', 'Investment'];

    this.miningCalculator = new MiningCalculator();
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
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(Calculators, {
      item: item
    });
  }
}
