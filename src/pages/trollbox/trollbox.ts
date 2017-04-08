import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

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
      public loadingCtrl: LoadingController,
      public data: PoloData) {
    this.selectedFilter = "all";
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    loader.present();
  }

  ionViewDidLoad() {
    //this.presentLoading();
    //console.log('ionViewDidLoad TrollboxPage');
  }


}
