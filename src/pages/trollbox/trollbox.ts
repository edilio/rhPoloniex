//import { CurrencySelectPage } from './../currency-select/currency-select';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController} from 'ionic-angular';

import { PoloData } from '../../providers/polo-data';


@Component({
  selector: 'page-trollbox',
  templateUrl: 'trollbox.html'
})
export class TrollboxPage {

  selectedFilter: string;
  
  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams, 
      public alertCtrl: AlertController,
      public data: PoloData) {
    this.selectedFilter = "all";
  }

  showRadio() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Select chat filter');

    this.data.allTabs.forEach(x => {
        alert.addInput(
          {
            type: 'radio',
            label: x.toUpperCase(),
            value: x,
            checked: this.selectedFilter == x
          }
      );
    })

    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        if (data) this.selectedFilter = data;
      }
    });
    alert.present();
  }

}