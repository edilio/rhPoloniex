import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Connection } from 'autobahn';
import { LoadingController } from 'ionic-angular';

/*
  Generated class for the Trollbox page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
interface Keyword {
  name: string;
  keywords: string[];
}

interface Message {
  time: Date;
  author: string;
  message: string;
}

@Component({
  selector: 'page-trollbox',
  templateUrl: 'trollbox.html'
})
export class TrollboxPage {
  keywords: Keyword[];
  hasReceivedMessage: boolean;
  tabs: string[];
  allTabs: string[];
  keywordsPerTab: any;
  msgs: any;
  selectedFilter: string;
  me: TrollboxPage;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController) {
    this.keywords  = [
        {   name: 'monero',
            keywords: ['xmr', 'monero']
        },
        {
            name: 'bitcoin',
            keywords: ['btc', 'bitcoin']
        },
        {
            name: 'ethereum',
            keywords: ['eth', 'ethereum']
        },
        {
            name: 'zcash',
            keywords: ['zec', 'zcash']
        },
        {
            name: 'decred',
            keywords: ['dcr', 'decred']
        },
        {
            name: 'golem',
            keywords: ['gnt', 'golem']
        },
        {
            name: 'pascalCoin',
            keywords: ['pasc', 'pascalcoin']
        },
        {
            name: 'dash',
            keywords: ['dash']
        },
        {
            name: 'bitcoinPlus',
            keywords: ['xbc', 'bitcoinPlus']
        },
        {
            name: 'litecoin',
            keywords: ['ltc', 'litecoin']
        },
        {
            name: 'ripple',
            keywords: ['xrp', 'ripple']
        }
    ];
    this.hasReceivedMessage = false;
    this.tabs = this.keywords.map(function(x) { return x.name; });
    this.allTabs = ['all'].concat(this.tabs);
    // console.log(this.tabs);
    this.keywordsPerTab = {};
    this.msgs = {};
    var me = this;
    this.me = me;
    this.tabs.forEach(function(tab) {
        me.keywordsPerTab[tab] = me.keywords.filter(function(item) {
            return item.name == tab;
        })[0].keywords;
        me.msgs[tab] = [];
    });
    this.selectedFilter = "all";
    this.launchTrollbox();
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    loader.present();
  }

  ionViewDidLoad() {
    this.presentLoading();
    console.log('ionViewDidLoad TrollboxPage');
  }

  launchTrollbox() {
      var wsuri = "wss://api.poloniex.com";
      var connection = new Connection({
          url: wsuri,
          realm: "realm1"
      });
      var me = this;

      connection.onopen = function (session) {
          // function marketEvent (args, kwargs) {
          //     console.log(args);
          // }

          // function tickerEvent (args, kwargs) {
          //     console.log(args);
          // }

          function trollboxEvent (args, kwargs) {
              var msg = args[3].toLowerCase();

              // console.log(msg);
              me.tabs.forEach(function (tab) {

                  me.keywordsPerTab[tab].forEach(function (item) {
                      var msgs = me.msgs[tab];
                      if (item == 'eth') {
                          msg = msg.replace('terrybeth', '')
                      }
                      if (msg.indexOf(item) > -1) {
                          console.log(msg);
                          if (msgs.indexOf(msg) == -1) {
                              let x: Message = {
                                'time': new Date(args[1]*1000),
                                'author': args[2],
                                message: msg};

                              msgs.unshift(x);
                              if (msgs.length > 100) {
                                  msgs.pop();
                              }
                              me.hasReceivedMessage = true;
                              this.$apply();

                          }
                      }
                  })
              });

          }

          session.subscribe('trollbox', trollboxEvent);
      };

      connection.onclose = function () {
          console.log("Websocket connection closed");
      };

      connection.open();
  }

}
