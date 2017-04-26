import { Component } from '@angular/core';

import { NavController, ItemSliding, AlertController, reorderArray } from 'ionic-angular';

import { InvestmentDetailPage } from '../investment-detail/investment-detail';
import { SearchCurrencyPage } from '../search-currency/search-currency';
import { Investment, PoloData } from '../../providers/polo-data';
import { AdMob, AdMobOptions } from '@ionic-native/admob';


@Component({
  selector: 'page-portfolio',
  templateUrl: 'portfolio.html'
})
export class Portfolio {
  watchList: Investment[];
  reorderList: boolean = false;
  
  constructor(
    public navCtrl: NavController, 
    public data: PoloData,
    public alertCtrl: AlertController,
    private admob: AdMob) {
      this.initAdmob();
    }

  initAdmob() {
    console.log('Hello AdMobPro Provider');
    let options: AdMobOptions = {
          adId: 'ca-app-pub-5732334124058455/7973166445',
          adSize: 'SMART_BANNER',
          isTesting: false
        };
    console.log('Hello AdMobPro Provider2');   
    console.log(this.admob); 
    this.admob.createBanner(options).then(()=>{
      console.log('Hello AdMobPro Provider3');
        this.admob.showBanner(8);
    });
  }

  itemTapped(event, item) {
    this.navCtrl.push(InvestmentDetailPage, {item: item});
  }

  reorderItems(indexes) {
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

  ionViewDidLoad() {
    this.admob.onAdDismiss()
      .subscribe(() => { console.log('User dismissed ad'); });
  }

  showAd() {
    this.admob.prepareInterstitial('84dab37da3b573c1859a4ecbc6d819a1')
      .then(() => { this.admob.showInterstitial(); });
  }

}
