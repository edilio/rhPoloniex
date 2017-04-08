import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, PopoverController , ViewController} from 'ionic-angular';

//import { LoadingController } from 'ionic-angular';
import { PoloData } from '../../providers/polo-data';
import { PopoverPage } from '../popover/popover';


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
      public data: PoloData,
      public popoverCtrl: PopoverController) {
    this.selectedFilter = "all";
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
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
