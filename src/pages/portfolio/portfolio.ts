import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { Connection } from 'autobahn';

  
class Investment {
  price1btc: number = 0;
  
  constructor (public currency: string, public balance: number = 0, public openOrders: number= 0,
               public avgCost: number, public actualPrice: number, public pctOfInvestment: number = 0) {

  }
  totalBalance() {
    return this.balance + this.openOrders;
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
      new Investment('BTC', 0.350778, 0, 1, 1),
      new Investment('XBC', 14.969794, 0, 0.053091427574999996, 0),
      new Investment('XMR', 91.404270, 0, 0.01881500, 0),
      new Investment('ETH', 41.935950, 0, 0.04902952136000001, 0),
      new Investment('ZEC', 21.831537, 0, 0.06091212, 0),
      new Investment('DASH', 21.945000, 0, 0.078169995, 0),
      new Investment('XRP', 20533.401957, 0,3.3459719810862946e-05, 0)
    
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
              } else if (x == 'BTC') {
                  let investment = me.getCurrencyData(currency);
                  if (investment) {
                    investment.actualPrice = currentPrice;
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
    console.log(item.currency);
  }

}
