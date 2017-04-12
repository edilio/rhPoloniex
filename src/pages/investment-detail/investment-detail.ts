import { PoloData } from './../../providers/polo-data';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Investment } from '../../providers/polo-data';


@Component({
  selector: 'page-investment-detail',
  templateUrl: 'investment-detail.html'
})
export class InvestmentDetailPage {
  investment: Investment;

  constructor(public navCtrl: NavController, public navParams: NavParams, public data: PoloData) {
    this.investment = navParams.data.item;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InvestmentDetailPage');
    this.investment.isNew = this.investment.currency == 'NEW';
  }

  ionViewWillLeave() {
    if (this.investment.currency === 'NEW' || this.investment.currency.length === 0){
      this.data.portfolio.pop();
    } else this.data.saveToStorage('my-potfolio', this.data.portfolio);
  }

  onCurrencyEnter(info){
    this.investment.currency = info.toUpperCase();
  }

}
