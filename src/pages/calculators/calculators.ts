
// export class Calculators {
//   selectedItem: any;
//   icons: string[];
//   calculators: string[];
//   items: Array<{title: string, note: string, icon: string}>;
//   calculator: string = "investment";
  
//   constructor(public navCtrl: NavController, public navParams: NavParams) {
//     // If we navigated to this page, we will have an item available as a nav param
//     this.selectedItem = navParams.get('item');

//     // Let's populate this page with some filler content for funzies
//     this.calculators = ['Mining', 'Investment'];

//     this.items = [];
//     for (let i = 0; i < 2; i++) {
//       this.items.push({
//         title: this.calculators[i],
//         note: this.calculators[i],
//         icon: 'calculator'
//       });
//     }
//   }
  

import { Component } from '@angular/core';

import { InvestmentCalculatorPage } from '../investment-calculator/investment-calculator';
import { MiningCalculatorPage } from '../mining-calculator/mining-calculator';

import { PowerMonthlyPage } from '../power-monthly/power-monthly';
import { RigsNeededPage } from '../rigs-needed/rigs-needed';
import { RigsPerRoomPage } from '../rigs-per-room/rigs-per-room';


@Component({
  templateUrl: 'calculators.html'
})
export class Calculators {

  tab1Root: any = InvestmentCalculatorPage;
  tab2Root: any = MiningCalculatorPage;
  tab3Root: any = PowerMonthlyPage;
  tab4Root: any = RigsNeededPage;
  tab5Root: any = RigsPerRoomPage;

  constructor() {}
}