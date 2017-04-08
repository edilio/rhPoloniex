import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Polo provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
let POLO_PUBLIC_API = 'https://poloniex.com/public';
let POLO_PUBLIC_COMMAND = POLO_PUBLIC_API + '?command=';


@Injectable()
export class Polo {
  public APIKey: string='';
  public Secret: string='';

  constructor(public http: Http) {
    console.log('Hello Polo Provider');
  }
    
  // post_process(self, before):
  //     after = before

  //     // Add timestamps if there isnt one but is a datetime
  //     if ('return' in after):
  //         if (isinstance(after['return'], list)):
  //             for x in xrange(0, len(after['return'])):
  //                 if (isinstance(after['return'][x], dict)):
  //                     if ('datetime' in after['return'][x] and 'timestamp' not in after['return'][x]):
  //                         after['return'][x]['timestamp'] = float(createTimeStamp(after['return'][x]['datetime']))

  //     return after


  apiQuery(command: string, req: any = {}) {
    let queries = {
        "returnTicker": POLO_PUBLIC_COMMAND + command,
        "return24Volume": POLO_PUBLIC_COMMAND + command,
        "returnOrderBook": POLO_PUBLIC_COMMAND + command + '&currencyPair=' + req['currencyPair'],
        "returnMarketTradeHistory": POLO_PUBLIC_COMMAND + "returnTradeHistory" + '&currencyPair=' + req['currencyPair'],
      },
      url = queries[command];
      if (url) {
        return this.http.get(url).map(response => response.json())
      } else {
        // Trading API
          // req['command'] = command
          // req['nonce'] = int(time.time() * 1000)
          // post_data = urllib.urlencode(req)

          // sign = hmac.new(self.Secret, post_data, hashlib.sha512).hexdigest()
          // headers = {
          //     'Sign': sign,
          //     'Key': self.APIKey
          // }

          // ret = urllib2.urlopen(urllib2.Request('https://poloniex.com/tradingApi', post_data, headers))
          // jsonRet = json.loads(ret.read())
          // return self.post_process(jsonRet)
      }
      
  }

  public returnTicker() {
    return this.apiQuery("returnTicker");
  }        

  return24Volume() {
    return this.apiQuery("return24Volume");
  }
        
  returnOrderBook(currencyPair){
    return this.apiQuery("returnOrderBook", {'currencyPair': currencyPair});
  }
        
  returnMarketTradeHistory(currencyPair) {
    return this.apiQuery("returnMarketTradeHistory", {'currencyPair': currencyPair});
  }
      
  // Returns all of your balances.
  // Outputs:
  // {"BTC":"0.59098578","LTC":"3.31117268", ... }
  returnBalances(self){
    return this.apiQuery('returnBalances');
  }

  // Returns your open orders for a given market, specified by the "currencyPair" POST parameter, e.g. "BTC_XCP"
  // Inputs:
  // currencyPair  The currency pair e.g. "BTC_XCP"
  // Outputs:
  // orderNumber   The order number
  // type          sell or buy
  // rate          Price the order is selling or buying at
  // Amount        Quantity of order
  // total         Total value of order (price * quantity)
  returnOpenOrders(currencyPair) {
    return this.apiQuery('returnOpenOrders', {"currencyPair": currencyPair});
  }        

  // Returns your trade history for a given market, specified by the "currencyPair" POST parameter
  // Inputs:
  // currencyPair  The currency pair e.g. "BTC_XCP"
  // Outputs:
  // date          Date in the form: "2014-02-19 03:44:59"
  // rate          Price the order is selling or buying at
  // amount        Quantity of order
  // total         Total value of order (price * quantity)
  // type          sell or buy
  returnTradeHistory(currencyPair){
    return this.apiQuery('returnTradeHistory', {"currencyPair": currencyPair});
  }
        

  // Places a buy order in a given market. Required POST parameters are "currencyPair", "rate", and "amount". If successful, the method will return the order number.
  // Inputs:
  // currencyPair  The curreny pair
  // rate          price the order is buying at
  // amount        Amount of coins to buy
  // Outputs:
  // orderNumber   The order number
  buy(currencyPair, rate, amount) {
    return this.apiQuery('buy', {"currencyPair": currencyPair, "rate": rate, "amount": amount});
  }
      

  // Places a sell order in a given market. Required POST parameters are "currencyPair", "rate", and "amount". If successful, the method will return the order number.
  // Inputs:
  // currencyPair  The curreny pair
  // rate          price the order is selling at
  // amount        Amount of coins to sell
  // Outputs:
  // orderNumber   The order number
  sell(currencyPair, rate, amount) {
    return this.apiQuery('sell', {"currencyPair": currencyPair, "rate": rate, "amount": amount});
  }
      

  // Cancels an order you have placed in a given market. Required POST parameters are "currencyPair" and "orderNumber".
  // Inputs:
  // currencyPair  The curreny pair
  // orderNumber   The order number to cancel
  // Outputs:
  // succes        1 or 0
  cancel(currencyPair, orderNumber) {
    return this.apiQuery('cancelOrder', {"currencyPair": currencyPair, "orderNumber": orderNumber});
  }
      

  // Immediately places a withdrawal for a given currency, with no email confirmation. In order to use this method, the withdrawal privilege must be enabled for your API key. Required POST parameters are "currency", "amount", and "address". Sample output: {"response":"Withdrew 2398 NXT."}
  // Inputs:
  // currency      The currency to withdraw
  // amount        The amount of this coin to withdraw
  // address       The withdrawal address
  // Outputs:
  // response      Text containing message about the withdrawal
  withdraw(currency, amount, address) {
    return this.apiQuery('withdraw', {"currency": currency, "amount": amount, "address": address});
  }
   
}
