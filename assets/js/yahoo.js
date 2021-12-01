var yahooOptions = {
    method: 'GET',
   
    params: {modules: 'defaultKeyStatistics,assetProfile'},
    headers: {
      'x-api-key': 'QneNp0oK9c6Aoa4i6WPzH1Ko1dh403MR2wS6nMtR'
    }
  };


var getStockNameApi = async function(stockName){
    try{
        let apiURL = `https://yfapi.net/v6/finance/autocomplete?lang=en&query=${stockName}`
        let response = await fetch(apiURL, yahooOptions)

        if(!response.ok){
            let message = `Error with status: ${response.status}`;
            throw new Error(message);
        }

        let data = await response.json();
        console.log(data);
        return {symbol: data.ResultSet.Result[0].symbol, name: data.ResultSet.Result[0].name};

    }catch(error){
        console.log(error);
    }
}


var getStockPriceApi = async function(symbol){
    try{
        let apiURL = `https://yfapi.net/v6/finance/quote?lang=en&symbols=${symbol}`
        let response = await fetch(apiURL,yahooOptions)

        if(!response.ok){
            let message = `Error with status: ${response.status}`;
            throw new Error(message);
        }

        let data = await response.json();
        console.log(data)
        return data.quoteResponse.result[0];
    }catch(error){
        console.log(error);
    }
}

var getStockValue = function(name){
    return getStockNameApi(name).then(stockNameObj =>{
        // Stock not found
        if (!stockNameObj.name || !stockNameObj.symbol){
            console.log("No Stock found");
            return null;
        }

        return getStockPriceApi(stockNameObj.symbol).then(data =>{
            
            let stockTempObj = {
                id: data.longName,
                symbol: data.symbol,
                name: stockNameObj.name,
                currentPrice: data.regularMarketPrice,
                prevDate: moment(data.regularMarketTime,"Xs").format("YYYY-MM-DD"),
                prevPrice: data.regularMarketPrice,
                investment: 0 ,
                profit: 0
            }
            return stockTempObj;
        });
    });
}
