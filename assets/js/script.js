var cryptoButtonList = []; // Track button list


// When user clicks submit button
var getUserInputHandler = function(event){
    event.preventDefault();
    console.log("here");
    $(".error-text").remove();
    let stockName = $("#stock-input").val().trim();

    if (!stockName){
        // add some tailwind css to red text
        $("#stock-input").after($("<span>").text("Stock Name Empty").addClass("error-text"));
        return;
    }

    getCyprotAssetName(stockName).then(function(cyrptoObj){ // getCyprotAssetName returns a promise (requires .then())
        // Checks if api has crypto 
        if(!cyrptoObj){
            $("#stock-input").after($("<span>").text("Stock Not Found").addClass("error-text"));
            return;
        }

        if(cryptoButtonList.indexOf(cyrptoObj.id) == -1){ // If it is a new crypto added to list

            // Create a button if crypto exists
            $(".stock-data").append($("<button>")
                .addClass("stock-btn")
                .text(cyrptoObj.name)
                .attr('data-crpto-id', cyrptoObj.id));

            // Append to button list to track
            cryptoButtonList.push(cyrptoObj.id);
            
        }else{
            $("#stock-input").after($("<span>").text("Selected stock already picked").addClass("error-text"));
        }
    });
    
}

$(".stock-form").on("submit",getUserInputHandler);
