import { Polo } from './../../providers/polo';

import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

import { PoloData, Investment } from '../../providers/polo-data';

 
@Component({
  selector: 'page-currency-info',
  templateUrl: 'currency-info.html'
})
export class CurrencyInfoPage {

  cc: any;
  selected: any;
  localInvestment: Investment;
  isBTC: boolean = false;
  isUSDT: boolean = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public data: PoloData,
    public polo: Polo,
    public loadingCtrl: LoadingController) {
      this.cc = navParams.data.item;
  }

  ionViewDidLoad() {
    this.updateCurrencyInfo();
  }

  cancelView(){
    this.navCtrl.pop();
  }

  addCurrency(){
    let newInvestment = new Investment(this.cc.symbol, 0, 0, 0, 0);
    this.data.portfolio.push(newInvestment); 
    this.cc.selected = true;
    this.cancelView();
  }

  updateCurrencyInfo(){
    let currencySymbol = this.cc.symbol;

    this.localInvestment = new Investment(currencySymbol, 0, 0, 0, 0);
    this.isBTC = currencySymbol === 'BTC';
    this.isUSDT = currencySymbol === 'USDT';
    
    let loading = this.loadingCtrl.create({
        content: `loading ${this.cc.symbol} info ...`,
        dismissOnPageChange: true
      });

    loading.present();

    let pairSymbol = this.isBTC || this.isUSDT ? `USDT_BTC` : `BTC_${currencySymbol}`;

    this.polo.returnTicker().subscribe(data => {
      let obj = data[pairSymbol];

        for (let key in obj){
          let value = parseFloat(obj[key]);
          this.localInvestment[key] = this.isUSDT ? 1/value : value;
        }

        loading.dismiss().catch(() => {});
    })

  }

}
