import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { Connection } from 'autobahn';

import { InvestmentDetailPage } from '../investment-detail/investment-detail';
  
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
  
  constructor (public currency: string, public balance: any = 0, public openOrders: any= 0,
               public avgCost: number, public actualPrice: number, public pctOfInvestment: number = 0,
               public isNew: boolean = true) {

  }
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


@Component({
  selector: 'page-portfolio',
  templateUrl: 'portfolio.html'
})
export class Portfolio {
  portfolio: Investment[];
  watchList: Investment[];
  price1btc: number = 0;
  
  constructor(public navCtrl: NavController) {
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
    this.updatePctOfInvestment();
    this.launchTicker();
  }

  totalBalanceInBTC() {
    let onlyBTCValues = this.portfolio.map(x=>x.btcValue());
    let totalBTC = onlyBTCValues.reduce((pv, cv, ci, arr) => (pv + cv), 0);
    return totalBTC;
  }

  totalBalanceInUSD() {
    let totalBTC = this.totalBalanceInBTC();
    return totalBTC * this.price1btc;
  }

  updatePctOfInvestment() {
    let totalBTC = this.totalBalanceInBTC();
    this.portfolio.forEach(item => {
      item.pctOfInvestment = item.btcValue() * 100.0/totalBTC;
    })
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
          session.subscribe('ticker', tickerEvent);
      }

      connection.onclose = function () {
        console.log("Websocket connection closed");
      }
                       
      connection.open();
  }

  itemTapped = function(event, item) {
    this.navCtrl.push(InvestmentDetailPage, {
        item: item
    });
  }

  removeInvestment(investment) {
    this.portfolio = this.portfolio.filter(item => item.currency !== investment.currency);
  }

  addInvestment() {
    let item = new Investment('NEW', 0, 0, 0, 0);
    this.portfolio.push(item);
    this.navCtrl.push(InvestmentDetailPage, {
        item: item
    });
  }

}
