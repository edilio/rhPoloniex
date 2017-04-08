import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
//import {Observable} from 'rxjs/Rx';
import { Connection } from 'autobahn';
import { Polo } from './polo';

/*
  Generated class for the PoloData provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
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


export class Investment {
  price1btc: number = 0;
  lowestAsk: number; 
  highestBid: number;
  percentChange: number; // 24 h change(poloniex)
  baseVolume: number;
  quoteVolume: number;
  isFrozen: number;
  _24hrHigh: number;
  _24hrLow: number;
  
  constructor (
    public currency: string, 
    public balance: any = 0, 
    public openOrders: any= 0,
    public avgCost: number, 
    public actualPrice: number, 
    public pctOfInvestment: number = 0,
    public isNew: boolean = true) {}

  totalBalance() {
    return parseFloat(this.balance) + parseFloat(this.openOrders);
  }
  btcValue () {
    return this.totalBalance() * this.actualPrice;
  }
  usdValue () {
    return this.btcValue() * this.price1btc;
  }
  pctChange () {
    return (this.actualPrice - this.avgCost)*100 / this.avgCost;
  }

}

@Injectable()
export class PoloData {

  portfolio: any;
  price1btc: any = 0;

  keywords: Keyword[];
  hasReceivedMessage: boolean;
  tabs: string[];
  allTabs: string[];
  keywordsPerTab: any;
  msgs: any;
  selectedFilter: string;
  
  constructor(public http: Http, public polo: Polo){ 
    // investment init
    this.portfolio = [
      new Investment('BTC', 0.22353417, 0, 1, 1, 0, false),
      new Investment('XBC', 14.96979426, 0, 0.053091427574999996, 0, 0, false),
      new Investment('XMR', 61.40426972	+ 4.185, 0, 0.01881500, 0, 0, false),
      new Investment('ETH', 41.935950, 0, 0.04902952136000001, 0, 0, false),
      new Investment('ZEC', 22.33917927, 0, 0.06091212, 0, 0, false),
      new Investment('DASH', 21.945000, 0, 0.078169995, 0, 0, false),
      new Investment('XRP', 31293.81558430, 0,0.00003316, 0, 0, false),
      new Investment('STR', 99750.00000010,0, 0.00000272, 0, 0, false)
    ];
    this.updatePorfolioPrices();

    //trollbox init
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
    this.keywordsPerTab = {};
    this.msgs = {};
    let me = this;
    this.tabs.forEach(function(tab) {
        me.keywordsPerTab[tab] = me.keywords.filter(function(item) {
            return item.name == tab;
        })[0].keywords;
        me.msgs[tab] = [];
    });
    this.selectedFilter = "all";

    // calling ws
    this.launchTicker();
  }

  launchTicker() {
      let wsuri = "wss://api.poloniex.com";
      let connection = new Connection({
          url: wsuri,
          realm: "realm1"
      });
      let me = this;

      connection.onopen = function (session) {

          function tickerEvent (args, kwargs) {
            let pair = args[0],
                currentPrice = args[1];
            let xy = pair.split('_');
            let x = xy[0], 
              currency = xy[1];
              if (pair == 'USDT_BTC') {
                  me.updateBTCPrice(currentPrice);
                  me.updatePctOfInvestment();
              } else if (x == 'BTC') {
                  let investment = me.getCurrencyData(currency);
                  if (investment) {
                    me.updateInvestment(investment, args);
                  }
              }
          }

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

          session.subscribe('ticker', tickerEvent);
          session.subscribe('trollbox', trollboxEvent);
      }

      connection.onclose = function () {
        console.log("Websocket every connection closed");
      }
                       
      connection.open();
  }

  totalBalanceInBTC() {
    let onlyBTCValues = this.portfolio.map(x=>x.btcValue());
    let totalBTC = onlyBTCValues.reduce((pv, cv, ci, arr) => (pv + cv), 0);
    return totalBTC || 0;
  }

  totalBalanceInUSD() {
    let totalBTC = this.totalBalanceInBTC();
    return totalBTC * this.price1btc || 0;
  }

  updatePctOfInvestment() {
    let totalBTC = this.totalBalanceInBTC();
    this.portfolio.forEach(item => {
      item.pctOfInvestment = item.btcValue() * 100.0/totalBTC;
    });
  }

  updateBTCPrice(price: number) {
    this.price1btc = price;
    this.portfolio.forEach(function(investment){
      investment.price1btc = price;
    });
    
  }

  getCurrencyData = function(ticker) {
     let currencies = this.portfolio.filter(item => item.currency == ticker);
     if (currencies.length > 0) {
       return currencies[0];
     } else {
       return undefined;
     }
  }

  updateInvestment(investment: Investment, args) {
    //currencyPair, last, lowestAsk, highestBid, percentChange, baseVolume, quoteVolume, isFrozen, 24hrHigh, 24hrLow
    let currentPrice = args[1]; 
         
    investment.actualPrice = currentPrice;
    investment.lowestAsk = args[2];
    investment.highestBid = args[3];
    investment.percentChange = args[4]*100;
    investment.baseVolume = args[5]; 
    investment.quoteVolume  = args[6];
    investment.isFrozen = args[7]; 
    investment._24hrHigh = args[8];
    investment._24hrLow = args[9];
  }
  
  updatePorfolioPrices() {
    let tickers = this.polo.returnTicker();
    setTimeout(() => {
      tickers.forEach(obj => {
          for (let pair in obj) {
            let ticker = obj[pair];
            if (pair.startsWith('BTC_')) {
              let currency = pair.substring(4),
                  inv = this.getCurrencyData(currency);
              if (inv && inv.actualPrice == 0) {
                inv.actualPrice = ticker['last'];
              }
            }
          }
          
        })
    }, 1000);
    
  }

}