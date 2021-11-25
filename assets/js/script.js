// var axios = import("axios").default;

var options = {
  method: 'GET',
 
  params: {modules: 'defaultKeyStatistics,assetProfile'},
  headers: {
    'x-api-key': 'QneNp0oK9c6Aoa4i6WPzH1Ko1dh403MR2wS6nMtR'
  }
};

// axios.request(options).then(function (response) {
// 	console.log(response.data);
// }).catch(function (error) {
// 	console.error(error);
// });

fetch("https://yfapi.net/v11/finance/quoteSummary/AAPL?modules=defaultKeyStatistics,assetProfile",options).then(function(response){
    return response.json();
}).then(function(data){
    console.log(data);
});