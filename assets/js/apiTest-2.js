// Obtain current stock price

var currentQuoteUrl = "https://finnhub.io/api/v1/quote?symbol=AAPL&token=c6grio2ad3iej642uru0";
// Can change symbol to change the company name 

fetch(currentQuoteUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);

  });

// response attributes can be found: https://finnhub.io/docs/api/quote (c-current price)



// Symbol Lookup
var symbolLookupUrl = "https://finnhub.io/api/v1/search?q=apple&token=c6grio2ad3iej642uru0";
// search for best-matching symbols, can input symbol, name, isin, or cusip

fetch(symbolLookupUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);

  });


