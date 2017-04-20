import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { PoloData, Investment } from '../../providers/polo-data';
import { CurrencyInfoPage } from '../currency-info/currency-info';


@Component({
  selector: 'page-search-currency',
  templateUrl: 'search-currency.html'
})
export class SearchCurrencyPage {

  searchQuery: string = '';
  items: Array<any> = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public data: PoloData) {
    //this.initializeItems();
  }

  ionViewDidLoad() {
   this.initializeItems();
  }

  initializeItems() {
    this.items = this.data.currencies || [];
    this.items.forEach(x => {
      x['selected'] = this.data.portfolio.findIndex(pt => pt.currency == x['symbol']) > -1;
    });
  }

  getItems(ev: any) {
    this.initializeItems();

    let val = ev.target.value;

    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item['symbol'].toLowerCase().indexOf(val.toLowerCase()) > -1 || item['name'].toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  onCancel(){
    this.navCtrl.pop();
  }

  itemTapped = function(e, item) {
    e.stopPropagation();
    this.navCtrl.push(CurrencyInfoPage, {item: item});
  }

  addCurrency(e, item){
    e.stopPropagation();
    if (!item['selected']){
      let newItem = new Investment(item.symbol, 0, 0, 0, 0);
      this.data.portfolio.push(newItem);
      this.initializeItems();
    }
    
  }

}
