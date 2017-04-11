import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-calculators',
  templateUrl: 'calculators.html'
})
export class Calculators {
  selectedItem: any;
  icons: string[];
  calculators: string[];
  items: Array<{title: string, note: string, icon: string}>;
  calculator: string = "investment";
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    // Let's populate this page with some filler content for funzies
    this.calculators = ['Mining', 'Investment'];

    this.items = [];
    for (let i = 0; i < 2; i++) {
      this.items.push({
        title: this.calculators[i],
        note: this.calculators[i],
        icon: 'calculator'
      });
    }
  }
  

// Investment calculator parameters
  investmentAmount: number = 1000;
  costPerCurrency: number = 0.00003102;
  priceToSellInvestment: number = 0.046;

  amountCurrency = function () {
    return Math.floor(this.investmentAmount/this.costPerCurrency);
  }

  costOfBuying = function () {
    return this.amountCurrency() * this.costPerCurrency;
  }

  totalSaleInvestment = function () {
    return this.amountCurrency() * this.priceToSellInvestment;
  }

  profitInvestment = function () {
    return this.totalSaleInvestment() - this.costOfBuying();
  }

  roiInvestment = function() {
    return this.profitInvestment() * 100 / this.costOfBuying();
  };

  // Mining calculator parameters
  noRigs: number = 10;
  costPerRig = 1500.00;
  hashesRigs: number = 4.1;
  xmrPerMiner: number = 0.44;
  priceToSell: number = 77;
  monthsToMine: number = 6;
  watts: number = 640;
  costPerWatt: number = 0.12;

  totalCostOfInvestment = function () {
    return this.noRigs * this.costPerRig;
  }

  costOfElectricityMonthly = function () {
    return this.noRigs * this.watts * this.costPerWatt;
  }

  moneroGenerated =  function () {
    return this.xmrPerMiner * this.noRigs * 30 * this.monthsToMine;
  }

  totalSale = function () {
    return this.moneroGenerated() * this.priceToSell;
  }

  totalSaleMinusInvestment = function () {
    return this.totalSale() - this.totalCostOfInvestment();
  }

  costOfElectricityInMonths = function () {
    return this.costOfElectricityMonthly() * this.monthsToMine;
  };

  totalCost = function () {
    return this.totalCostOfInvestment() + this.costOfElectricityInMonths();
  }

  totalProfit = function () {
    return this.totalSaleMinusInvestment() - this.costOfElectricityInMonths();
  }
  
  roi = function () {
    return this.totalProfit() * 100 / this.totalCost();
  }
  profit = function () {
    return this.totalSale() - this.costOfElectricityInMonths();
  }

  roiWithoutRigInvestment = function() {
    return this.profit() * 100 / this.costOfElectricityInMonths();   
  } 



}
