
async function getAssetNameApi(AssetName){
    try{
        // Only 1 result
        let apiURL = `https://api.coincap.io/v2/assets?limit=1&search=${AssetName}`;
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

async function getHistoricCryptoApi(id, startTime, endTime, interval='d1'){
    try{
        let apiURL = `https://api.coincap.io/v2/assets/${id}/history?interval=${interval}&start=${startTime}&end=${endTime}`;
        
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

var getCryptoAsset = function(name){
    return getAssetNameApi(name).then(data => {
        //console.log("Asset Name data return", data);

        if(!data.data[0]){
            console.log("No Crypto found");
            return null;
        }

        let cryptoTempObj = {
            id: data.data[0].id.trim(),
            symbol: data.data[0].symbol.trim(),
            name: data.data[0].name.trim(),
            rank: data.data[0].rank.trim(),
            currDate: moment().format("YYYY-MM-DD"),
            currPrice: data.data[0].priceUsd.trim(),
            prevDate: moment().format("YYYY-MM-DD"),
            prevPrice: data.data[0].priceUsd.trim(),
            type: "crypto",
            investment: 0,
            profit: 0,
        }
        return cryptoTempObj;

    });
}

var getCryptoHistoricalData = function(id, timeString, interval='d1'){

    // Use moment to parse time in unix timestamp
    startTime = moment(timeString).subtract(1,"d").format("x");
    endTime = moment(timeString).format("x");

    // Call the API
    return getHistoricCryptoApi(id, startTime, endTime, interval).then(data => {
        console.log("historic data return", data);

        if(data){
            return{
                prevPrice: data.data[0].priceUsd ,
                prevDate: moment(data.data[0].date).add(1,"d").format("YYYY-MM-DD")
            };
        }else{
            return null;
        }
        
    });
    
}





