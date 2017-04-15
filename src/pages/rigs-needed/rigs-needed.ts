import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-rigs-needed',
  templateUrl: 'rigs-needed.html'
})
export class RigsNeededPage {
  rigType: string = 'needed'
  //needed
  goalInDollars: number = 1000;
  profitPerRig: number = 8;
  //per room vars
  breakerAmps: number = 25;
  wattsPerRig: number = 950;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}
  
  //needed
  noRigs () {
    return this.goalInDollars / (this.profitPerRig * 30);
  }

  //per rooms functions
  rigs110() {
    return this.breakerAmps*110/this.wattsPerRig;
  }

  rigs220() {
    return this.breakerAmps*220/this.wattsPerRig;
  }

}
