import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the CostToMineCoin page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-cost-to-mine-coin',
  templateUrl: 'cost-to-mine-coin.html'
})
export class CostToMineCoinPage {
  hours: number = 24
  costKW: number = 0.12;
  noRigs: number = 6;
  wattsPerRig: number = 870;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  powerComsuption() {
    return this.wattsPerRig * this.noRigs * this.hours / 1000;
  }

  costOfMining() {
    return this.powerComsuption() * this.costKW;        
  }


}
