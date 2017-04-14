import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the RigsPerRooom page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-rigs-per-room',
  templateUrl: 'rigs-per-room.html'
})
export class RigsPerRoomPage {
  breakerAmps: number = 25;
  wattsPerRig: number = 950;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  rigs110() {
    return this.breakerAmps*110/this.wattsPerRig;
  }

  rigs220() {
    return this.breakerAmps*220/this.wattsPerRig;
  }

  ionViewDidLoad() {
    
  }

}
