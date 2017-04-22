
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

import { Connection } from 'autobahn';
import { Polo } from './polo';


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
    public avgCost: number = 0, 
    public actualPrice: number = 0, 
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
    return this.avgCost === 0 ? 0 : (this.actualPrice - this.avgCost)*100 / this.avgCost;
  }
}


@Injectable()
export class PoloData {

  portfolio: any = [new Investment('BTC', 0, 0, 1, 1, 0, false)];
  price1btc: any = 0;

  keywords: Keyword[];
  hasReceivedMessage: boolean;
  tabs: string[];
  allTabs: string[];
  keywordsPerTab: any;
  msgs: any;
  selectedFilter: string;

  currencies: Array<any> = [];
  currenciesInfo: any;
  
  constructor(public http: Http, public polo: Polo, public storage: Storage){ 

    this.storage.ready().then(() => {
      this.getFromStorage('my-potfolio');
    });

    this.initValues();
    this.getCurrencies();
  }

  initValues(){
    this.updatePorfolioPrices();

    //trollbox init
    this.keywords  = [
        {   name: 'monero',
            keywords: ['xmr', 'monero']
        },
        {
            name: 'bitcoin',
            keywords: ['btc', 'bitcoin', 'Segwit']
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

  saveToStorage(name: string, info: any){
    this.storage.set(name, info);
  }

  setPortfolio(data){
    let arr = [];

    data.forEach(element => {
      let inv = new Investment(
        element.currency, 
        element.balance, 
        element.openOrders, 
        element.avgCost, 
        element.actualPrice, 
        element.pctOfInvestment,
        false);
      arr.push(inv);
    });

    if (arr.length > 0) this.portfolio = arr;
  }

  getFromStorage(name: string){
    this.storage.get(name).then(data => {
        if (name === 'my-potfolio' && data) this.setPortfolio(data);
      });
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
                  let investment = me.getCurrencyData('USDT');
                  if (investment) {
                    me.updateInvestment(investment, args);
                  }
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
                          //console.log(msg);
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
      let onlyBTCValues = this.portfolio.map(x => x.btcValue()),
        totalBTC = onlyBTCValues.reduce((pv, cv, ci, arr) => (pv + cv), 0);

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

  updateCurrencyInfo(args){
    //currencyPair, last, lowestAsk, highestBid, percentChange, baseVolume, quoteVolume, isFrozen, 24hrHigh, 24hrLow
    let currencyPair = args[0];

    this.currenciesInfo[currencyPair]['last'] = args[1];
    this.currenciesInfo[currencyPair]['lowestAsk'] = args[2];
    this.currenciesInfo[currencyPair]['highestBid'] = args[3];
    this.currenciesInfo[currencyPair]['percentChange'] = args[4];
    this.currenciesInfo[currencyPair]['baseVolume'] = args[5];
    this.currenciesInfo[currencyPair]['quoteVolume'] = args[6];
    this.currenciesInfo[currencyPair]['isFrozen'] = args[7];
    this.currenciesInfo[currencyPair]['high24hr'] = args[8];
    this.currenciesInfo[currencyPair]['low24hr'] = args[9];
  }

  updateInvestment(investment: Investment, args) {
    //currencyPair, last, lowestAsk, highestBid, percentChange, baseVolume, quoteVolume, isFrozen, 24hrHigh, 24hrLow
   
    
    investment.actualPrice = args[0] === 'USDT_BTC'? 1/args[1]: args[1];
    investment.lowestAsk = args[2] === 'USDT_BTC'? 1/args[2]: args[2];
    investment.highestBid = args[2] === 'USDT_BTC'? 1/args[2]: args[2];
    investment.percentChange = args[0] === 'USDT_BTC'? -args[4]*100: args[4]*100;
    investment.baseVolume = args[5]; 
    investment.quoteVolume  = args[6];
    investment.isFrozen = args[7]; 
    investment._24hrHigh = args[8];
    investment._24hrLow = args[9];
    this.updateCurrencyInfo(args);
  }

  getCurrencies(){
    this.polo.returnCurrencies().subscribe(data => {

      for (let key in data ){
        let dataObj = data[key];

        if (dataObj['delisted'] == 0 && dataObj['frozen'] == 0){
          let obj = {id: dataObj['id'], symbol: key, name: dataObj['name'], selected: false}
          this.currencies.push(obj);
        }
      }

      //console.log(data);

    })
  }

  updatePorfolioPrices() {
    // let tickers = this.polo.returnTicker();

    // setTimeout(() => {
    //   tickers.forEach(obj => {
    //       for (let pair in obj) {
    //         let ticker = obj[pair];
    //         if (pair.startsWith('BTC_')) {
    //           let currency = pair.substring(4),
    //               inv = this.getCurrencyData(currency);
    //           if (inv && inv.actualPrice == 0) {
    //             inv.actualPrice = ticker['last'];
    //           }
    //         }
    //       }
          
    //     });
    // }, 1000);

    this.polo.returnTicker().subscribe(data => {
     
      Object.keys(data).forEach(key => {
        let obj = data[key];

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
        
      });

      this.currenciesInfo = data;
        
    });
    
  }

}