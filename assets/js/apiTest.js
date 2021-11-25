
const coinApiKey = config.coinAPI;
console.log(coinApiKey);


var options = {
    method: 'GET',
    headers: {
        'X-CoinAPI-Key': coinApiKey
    }
};

async function getCrypto(base_id, quote_id, apiKey, givenTime=null){
    let apiURL = `https://rest.coinapi.io/v1/exchangerate/${base_id}/${quote_id}`
    let response = await fetch(apiURL,options);

    if(!response.ok){
        let message = `Error with status: ${response.status}`;
        throw new Error(message);
    }

    let data = await response.json();
    return data
}

getCrypto("BTC", "USD", coinApiKey).then(data => {
    console.log(data);
})

