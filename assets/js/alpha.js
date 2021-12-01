  
var getStockNameApi = async function(stockName, apikey=config.alphaAPI){

    try{
        let apiURL = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${stockName}&apikey=${apikey}`
        let response = await fetch(apiURL)

        if(!response.ok){
            let message = `Error with status: ${response.status}`;
            throw new Error(message);
        }

        let data = await response.json();
        console.log(data);
        console.log(data.bestMatches[0]['1. symbol']);
        return data.bestMatches[0]['1. symbol'];

    }catch(error){
        console.log(error);
    }
}

var getStockPriceApi = async function(symbol, apikey=config.alphaAPI2){
    try{
        let apiURL = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${apikey}`
        let response = await fetch(apiURL)

        if(!response.ok){
            let message = `Error with status: ${response.status}`;
            throw new Error(message);
        }

        let data = await response.json();
        let timeSeries = data[Object.keys(data)[1]];
        return {closePrice: timeSeries[Object.keys(timeSeries)[1]]['4. close'], closeDate: Object.keys(timeSeries)[1] };
z
    }catch(error){
        console.log(error);
    }
}

var getSymbol = async function(stockName){
    getStockNameApi(stockName).then(symbolName => {
        console.log(symbolName);
        getStockPriceApi(symbolName).then(priceObj => console.log(priceObj));
    });  
}

