import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Investment } from '../portfolio/portfolio'

/*
  Generated class for the InvestmentDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-investment-detail',
  templateUrl: 'investment-detail.html'
})
export class InvestmentDetailPage {
  investment: Investment;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.investment = navParams.data.item;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InvestmentDetailPage');
    this.investment.isNew = this.investment.currency == 'NEW';
  }

  ionViewDidUnload() {
    this.investment.isNew = this.investment.currency == 'NEW';
  }

}
