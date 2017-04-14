import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the PowerMonthly page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-power-monthly',
  templateUrl: 'power-monthly.html'
})
export class PowerMonthlyPage {
  noRigs: number = 5;
  costKW: number = 0.12;
  wattsPerRig: number = 950;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  kwDailyPerRig () {
    return (this.wattsPerRig/1000)*24;
  }

  totalDailyKW() {
    return this.kwDailyPerRig() * this.noRigs;
  }

  usdDailyPerRig () {
    return this.kwDailyPerRig() * this.costKW;
  }

  totalDailyUSD() {
    return this.totalDailyKW() * this.costKW;
  }

  monthlyKWperRig () {
    return this.kwDailyPerRig() * 30;
  }

  monthlyUSDperRig () {
    return this.monthlyKWperRig() * this.costKW;
  }

  total30DaysKW () {
    return this.monthlyKWperRig() * this.noRigs;
  }

  total30DaysUSD () {
    return this.total30DaysKW() * this.costKW;
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad PowerMonthlyPage');
  }

}
