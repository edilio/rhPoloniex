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
    this.localInvestment = new Investment(this.cc.symbol, 0, 0, 0, 0);

    let loading = this.loadingCtrl.create({
        content: `loading ${this.cc.symbol} info ...`,
        dismissOnPageChange: true
      });

      loading.present();

    let currencySymbol = this.cc.symbol;

    if (currencySymbol !== 'BTC'){
      this.polo.returnTicker().subscribe(data => {
        let pairSymbol = `BTC_${currencySymbol}`,
          obj = data[pairSymbol];

          for (let key in obj){
            this.localInvestment[key] = obj[key];
          }

          loading.dismiss();
      })

    } else this.cancelView();
  }

}
