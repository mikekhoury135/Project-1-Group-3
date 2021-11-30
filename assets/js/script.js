const errorTextCSS = "";

// When user clicks submit button
var getUserInputHandler = async function(event){
    event.preventDefault();
    $(".error-text").remove();
    let cryptoName = $("#stock-input").val().trim();
    let cryptoDate = currentDate = $( "#datepicker" ).datepicker( "getDate" );

    if (!cryptoName){
        // add some tailwind css to red text
        $("#stock-input").after($("<span>").text("Stock Name Empty").addClass("error-text"));
        return;
    }

    if(!cryptoDate){
        $("#datepicker").after($("<span>").text("Date is Empty").addClass("error-text"));
        return;
    }
    
    // Gets the cyrpto asset 
    let cryptoObj = await getCyprotAssetName(cryptoName) 

    // Checks if api has crypto 
    if(!cryptoObj){
        $("#stock-input").after($("<span>").text("Stock Not Found").addClass("error-text"));
        return;
    }

    // Append new object if it doesn't exist
    if(!cryptoObjList[cryptoObj.id]){
        // Update the Obj List
        cryptoObjList[cryptoObj.id] = cryptoObj;

        // Create a button 
        $(".stock-data").append($("<button>")
            .addClass("stock-btn")
            .text(cryptoObj.name)
            .attr('data-crpto-id', cryptoObj.id));

    }else{ // The searched stock is already selected
        $("#stock-input").after($("<span>").text("Selected stock already picked").addClass("error-text"));
    }

  
    let historicPriceObj = await getHistoricalData(cryptoObj.id, cryptoDate );

    // Update crypto list with historic prices
    cryptoObjList[cryptoObj.id].prevPrice = historicPriceObj.prevPrice;
    cryptoObjList[cryptoObj.id].prevDate = historicPriceObj.prevDate

    console.table(cryptoObjList[cryptoObj.id]);
    

}


var calculate = function(){
    
}

// Jquery UI datepicker
$( "#datepicker" ).datepicker({
    dateFormat: "yy-mm-d"
});
$(".stock-form").on("submit",getUserInputHandler);


