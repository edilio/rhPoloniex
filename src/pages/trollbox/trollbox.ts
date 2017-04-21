import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

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
      public data: PoloData,
      private iab: InAppBrowser) {
    this.selectedFilter = "all";
  }

  showUrl(){
    let url: string = 'http://xmr.mockingjaysoft.com/blog/how-to-earn-41376-dollars-with-cryptocurrencies-in-less-than-one-year.html';
    this.iab.create(url, '_system');
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