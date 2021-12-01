var yahooOptions = {
    method: 'GET',
   
    params: {modules: 'defaultKeyStatistics,assetProfile'},
    headers: {
      'x-api-key': config.yahooAPI2,
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

var getHistoricalStockApi = async function(id, inputDate, apikey=config.finageAPI){
    try{
        if(moment(inputDate,"YYYY-MM-DD").isSameOrAfter(moment())){ // Cant be same as current
            console.log("can't have a future/same sate")
            return;
        }

        let apiURL =`https://api.finage.co.uk/history/stock/open-close?stock=${id}&date=${inputDate}&apikey=${apikey}`;

        let response = await fetch(apiURL)
        if(!response.ok){
            let message = `Error with status: ${response.status}`;
            throw new Error(message);
        }
        let data = await response.json();
        return data

    }catch(error){
        console.log(error);
    }


}

var getStockAsset = function(name){
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
                rank: 0,
                currDate: moment().format("YYYY-MM-DD"),
                currPrice: data.regularMarketPrice,
                prevDate: moment(data.regularMarketTime,"Xs").format("YYYY-MM-DD"),
                prevPrice: data.regularMarketPrice,
                investment: 0 ,
                profit: 0
            }
            return stockTempObj;
        });
    });
}


var getStockHistoricalData = function(id, timeString){
    return getHistoricalStockApi(id,timeString).then(data => {
        console.log("historic data return",data, data.close, data.from);
        return {
            prevPrice: data.close,
            prevDate: data.from
        };
    });
}
