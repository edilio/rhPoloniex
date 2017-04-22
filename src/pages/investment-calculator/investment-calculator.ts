import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the InvestmentCalculator page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-investment-calculator',
  templateUrl: 'investment-calculator.html'
})
export class InvestmentCalculatorPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  
// Investment calculator parameters
  investmentAmount: number = 1000;
  costPerCurrency: number = 0.03102;
  priceToSellInvestment: number = 0.50;

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

}
