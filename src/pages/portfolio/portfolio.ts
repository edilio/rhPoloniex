import { Component } from '@angular/core';

import { NavController, ItemSliding, AlertController, reorderArray } from 'ionic-angular';

import { InvestmentDetailPage } from '../investment-detail/investment-detail';
import { SearchCurrencyPage } from '../search-currency/search-currency';
import { Investment, PoloData } from '../../providers/polo-data';
//import { AdMobPro } from '../../providers/ad-mob-pro';


@Component({
  selector: 'page-portfolio',
  templateUrl: 'portfolio.html'
  //providers: [AdMobPro]
})
export class Portfolio {
  watchList: Investment[];
  reorderList: boolean = false;
  
  constructor(
    public navCtrl: NavController, 
    public data: PoloData,
    public alertCtrl: AlertController) {}

  itemTapped(event, item) {
    this.navCtrl.push(InvestmentDetailPage, {item: item});
  }

  reorderItems(indexes){
    this.data.portfolio = reorderArray(this.data.portfolio, indexes);
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
          text: 'Cancel',
          handler: () => {
            slidingItem.close();
          }
        },
        {
          text: 'Delete',
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

  searchCurrency() {
    this.navCtrl.push(SearchCurrencyPage);
  }

  showAd(){
    //this.admob.onClick();
  }

}
