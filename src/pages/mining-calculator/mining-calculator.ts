import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the MiningCalculator page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-mining-calculator',
  templateUrl: 'mining-calculator.html'
})
export class MiningCalculatorPage {

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad MiningCalculatorPage');
  }

}
