// Can be defined somewhere else
var stockObjList = {};
var cryptoObjList = {};

// Coin cap

async function getAssetName(AssetName){
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
}

async function getHistoricCrypto(id, startTime, endTime, interval='d1'){
    let apiURL = `https://api.coincap.io/v2/assets/${id}/history?interval=${interval}&start=${startTime}&end=${endTime}`;

    console.log('Calling this api now:', apiURL);
    let response = await fetch(apiURL);

    if(!response.ok){
        let message = `Error with status: ${response.status}`;
        throw new Error(message);
    }
    let data = await response.json();
    return data
}


var getCyprotAssetName = function(name){
    getAssetName(name).then(data => {
        console.log("Asset Name data return", data);

        let cryptoSymbol = data.data[0].symbol.trim();
        let cryptoName = data.data[0].name.trim();
        let cryptoID = data.data[0].id.trim();
        let cryptoRank = data.data[0].rank.trim();
        let cryptoPrice = data.data[0].priceUsd.trim();
        let previousDate = moment().format("YYYY-MM-DD");

        if(!cryptoObjList[cryptoID]){
            //Generate new object to store
            cryptoObjList[cryptoID] = {
                symbol: cryptoSymbol,
                name: cryptoName,
                rank: cryptoRank,
                currentPrice: cryptoPrice,
                prevDate: previousDate,
                prevPrice: cryptoPrice,
                investment: 0,
                profit: 0,

            }
        }
        console.log("GETTING HISTORICAL DATA! for",cryptoID);

        // Call to get historic data (just for testing)
        getHistoricalData(cryptoID, "2018.11.20", 'd1');
    });
}

var getHistoricalData = function(id, timeString, interval='d1'){

    // Use moment to parse time in unix timestamp
    startTime = moment(timeString).subtract(1,"d").format("x");
    endTime = moment(timeString).format("x");

    // Call the API
    getHistoricCrypto(id, startTime, endTime, interval).then(data => {
        console.log("historic data return", data);

        cryptoObjList[id].prevPrice = data.data[0].priceUsd;
        cryptoObjList[id].prevDate = moment(data.data[0].date).format("YYYY-MM-DD");
    })

    // Print to console for testing
    console.table(cryptoObjList[id]);
}

// Testing bitcoin
getCyprotAssetName("Bitcoin");
