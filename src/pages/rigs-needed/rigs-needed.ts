import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the RigsNeeded page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-rigs-needed',
  templateUrl: 'rigs-needed.html'
})
export class RigsNeededPage {
  goalInDollars: number = 1000;
  profitPerRig: number = 8;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  noRigs () {
    return this.goalInDollars / (this.profitPerRig * 30);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RigsNeededPage');
  }

}
