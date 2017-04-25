import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { AdMob, AdMobOptions, AdSize, AdExtras } from '@ionic-native/admob';

import 'rxjs/add/operator/map';


@Injectable()
export class AdMobPro {

  constructor(public http: Http, private admob: AdMob) {
    console.log('Hello AdMobPro Provider');
    let options: AdMobOptions = {
          adId: 'ca-app-pub-5732334124058455/7973166445',
          adSize: 'SMART_BANNER',
          isTesting: false
        };
        
    this.admob.createBanner(options).then(()=>{
        this.admob.showBanner(8)
    })
  }

  ionViewDidLoad() {
    this.admob.onAdDismiss()
      .subscribe(() => { console.log('User dismissed ad'); });
  }

  onClick() {
    this.admob.prepareInterstitial('84dab37da3b573c1859a4ecbc6d819a1')
      .then(() => { this.admob.showInterstitial(); });
  }

}
