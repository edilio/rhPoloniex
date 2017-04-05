import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { MiningCalculatorPage } from '../mining-calculator/mining-calculator';
import { InvestmentCalculatorPage } from '../investment-calculator/investment-calculator';

@Component({
  selector: 'page-calculators',
  templateUrl: 'calculators.html'
})
export class Calculators {
  selectedItem: any;
  icons: string[];
  calculators: string[];
  items: Array<{title: string, note: string, icon: string}>;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    // Let's populate this page with some filler content for funzies
    this.calculators = ['Mining', 'Investment'];

    this.items = [];
    for (let i = 0; i < 2; i++) {
      this.items.push({
        title: this.calculators[i],
        note: this.calculators[i],
        icon: 'calculator'
      });
    }
  }
  
  itemTapped(event, item) {
    let pages = {
      'Mining': MiningCalculatorPage,
      'Investment': InvestmentCalculatorPage,
      
    }
    this.navCtrl.push(pages[item.title], {
        item: item
    });
  }
}
