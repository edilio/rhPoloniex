import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { InvestmentDetailPage } from '../investment-detail/investment-detail';
import { Investment, PoloData } from '../../providers/polo-data';


@Component({
  selector: 'page-portfolio',
  templateUrl: 'portfolio.html'
})
export class Portfolio {
  portfolio: Investment[] = this.data.portfolio;
  watchList: Investment[];
  
  constructor(
    public navCtrl: NavController, 
    public data: PoloData) {}


  itemTapped = function(event, item) {
    this.navCtrl.push(InvestmentDetailPage, {
        item: item
    });
  }

  removeInvestment(investment) {
    this.portfolio = this.portfolio.filter(item => item.currency !== investment.currency);
  }

  addInvestment() {
    let item = new Investment('NEW', 0, 0, 0, 0);
    this.portfolio.push(item);
    this.navCtrl.push(InvestmentDetailPage, {
        item: item
    });
  }

}
