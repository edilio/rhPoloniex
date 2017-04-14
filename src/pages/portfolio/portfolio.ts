import { Component } from '@angular/core';

import { NavController, ItemSliding, AlertController } from 'ionic-angular';

import { InvestmentDetailPage } from '../investment-detail/investment-detail';
import { Investment, PoloData } from '../../providers/polo-data';


@Component({
  selector: 'page-portfolio',
  templateUrl: 'portfolio.html'
})
export class Portfolio {
  watchList: Investment[];
  
  constructor(
    public navCtrl: NavController, 
    public data: PoloData,
    public alertCtrl: AlertController) {}


  itemTapped = function(event, item) {
    //slidingItem.close();
    this.navCtrl.push(InvestmentDetailPage, {
        item: item
    });
  }

  removeInvestment0(investment) {
    
    this.data.portfolio = this.data.portfolio.filter(item => item.currency !== investment.currency);
    this.data.saveToStorage('my-potfolio', this.data.portfolio);
  }

  addInvestment() {
    let item = new Investment('NEW', 0, 0, 0, 0);
    this.data.portfolio.push(item);
    this.navCtrl.push(InvestmentDetailPage, {
        item: item
    });
  }

  removeInvestment(slidingItem: ItemSliding, investment) {
    let confirm = this.alertCtrl.create({
      title: 'Remove item from Portfolio?',
      message: 'This action will remove selected item from the list',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            slidingItem.close();
          }
        },
        {
          text: 'Agree',
          handler: () => {
            slidingItem.close();
            this.data.portfolio = this.data.portfolio.filter(item => item.currency !== investment.currency);
            this.data.saveToStorage('my-potfolio', this.data.portfolio);
          }
        }
      ]
    });
    confirm.present();
  }

}
