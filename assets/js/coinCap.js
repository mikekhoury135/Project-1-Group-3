// Can be defined somewhere else
var stockObjList = {}; 
var cryptoObjList = {}; // global crypto list

// Coin cap

var apiHeader = {
    "Accept-Encoding": gzip
}
async function getAssetName(AssetName){
    try{
        // Only 1 result
        let apiURL = `https://api.coincap.io/v2/assets?limit=1&search=${AssetName}`;

        console.log('Calling this api now:', apiURL);
        let response = await fetch(apiURL);

        if(!response.ok){
            let message = `Error with status: ${response.status}`;
            throw new Error(message);
        }

        let data = await response.json();
        return data
    
    }catch(error){
        console.log('Error: ' + error);

    }
}

async function getHistoricCrypto(id, startTime, endTime, interval='d1'){
    try{
    let apiURL = `https://api.coincap.io/v2/assets/${id}/history?interval=${interval}&start=${startTime}&end=${endTime}`;

    console.log('Calling this api now:', apiURL);
    let response = await fetch(apiURL);
    console.log(response);
    if(!response.ok){
        let message = `Error with status: ${response.status}`;
        throw new Error(message);
    }
    let data = await response.json();
    return data

    }catch(error){
        console.log('Error: ' + error);
    }
}

// return true if crypto found else returns false
var getCyprotAssetName = function(name){
    return getAssetName(name).then(data => {
        //console.log("Asset Name data return", data);

        if(!data.data[0]){
            console.log("No stock found");
            return null;
        }

        let cryptoTempObj = {
            id: data.data[0].id.trim(),
            symbol: data.data[0].symbol.trim(),
            name: data.data[0].name.trim(),
            rank: data.data[0].rank.trim(),
            currentPrice: data.data[0].priceUsd.trim(),
            prevDate: moment().format("YYYY-MM-DD"),
            prevPrice: data.data[0].priceUsd.trim(),
            investment: 0,
            profit: 0,
        }
        return cryptoTempObj;

    });
        // console.log("GETTING HISTORICAL DATA! for",cryptoID);

        // // Call to get historic data (just for testing)
        // getHistoricalData(cryptoID, "2018.11.20", 'd1');
    
}

var getHistoricalData = function(id, timeString, interval='d1'){

    // Use moment to parse time in unix timestamp
    startTime = moment(timeString).subtract(1,"d").format("x");
    endTime = moment(timeString).format("x");

    // Call the API
    return getHistoricCrypto(id, startTime, endTime, interval).then(data => {
        console.log("historic data return", data);
        let historicPrice = {
            prevPrice: data.data[0].priceUsd ,
            prevDate: moment(data.data[0].date).add(1,"d").format("YYYY-MM-DD")
        };
        return historicPrice;
        // Print to console for testing
    });
    
}





