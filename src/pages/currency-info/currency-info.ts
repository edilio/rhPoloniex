
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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
    public data: PoloData) {
      this.cc = navParams.data.item;
  }

  // investment.actualPrice = currentPrice;
  //   investment.lowestAsk = args[2];
  //   investment.highestBid = args[3];
  //   investment.percentChange = args[4]*100;
  //   investment.baseVolume = args[5]; 
  //   investment.quoteVolume  = args[6];
  //   investment.isFrozen = args[7]; 
  //   investment._24hrHigh = args[8];
  //   investment._24hrLow = args[9];

  ionViewDidLoad() {
    this.localInvestment = this.cc.selected ? this.data.portfolio.filter(x => x.currency == this.cc.symbol)[0] : new Investment(this.cc.symbol, 0, 0, 0, 0);
    console.log(this.localInvestment);
  }

  onCancel(){
    this.navCtrl.pop();
  }

  addCurrency(){
    this.data.portfolio.push(this.localInvestment); 
    this.cc.selected = true;
  }

}
