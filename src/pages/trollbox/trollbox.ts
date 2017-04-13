import { CurrencySelectPage } from './../currency-select/currency-select';
import { Component } from '@angular/core';
import { NavController, NavParams, ModalController} from 'ionic-angular';

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
      //public popoverCtrl: PopoverController,
      public data: PoloData,
      public modalCtrl: ModalController) {
    this.selectedFilter = "all";
  }

  // presentPopover(myEvent) {
  //   let popover = this.popoverCtrl.create(CurrencySelectPage,{filter: this.selectedFilter});
    
  //   popover.present({
  //     ev: myEvent
  //   });

  //   popover.onDidDismiss((popoverData) => {
  //     if (popoverData) this.selectedFilter = popoverData;
  //   })
  // }

  presentContactModal() {
    let contactModal = this.modalCtrl.create(CurrencySelectPage,{filter: this.selectedFilter});
    contactModal.present();

    contactModal.onDidDismiss((newFilter) => {
      if (newFilter) this.selectedFilter = newFilter;
    });
  }

  //ionViewDidLoad() {
    //this.presentLoading();
    //console.log('ionViewDidLoad TrollboxPage');
  //}

}