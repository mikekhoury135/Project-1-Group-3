const errorTextCSS = "error-text";

// Store functions in object
const assestFunctions = {
    crypto: {
        asset: getCryptoAsset,
        historicPrice: getCryptoHistoricalData
    },
    stock: {
        asset: getStockAsset,
        historicPrice: getStockHistoricalData
    }
};

// When user clicks submit button
var getUserInputHandler = async function(event){
    event.preventDefault();
    $(".error-text").remove();

    let financeOption = $(".finance-option:checked").val().toLowerCase();
    let nameInput = $("#stock-input").val().trim();
    let dateInput = $( "#datepicker" ).val();

    if (!nameInput){
        // add some tailwind css to red text
        $("#stock-input").after($("<span>").text("Stock Name Empty").addClass(errorTextCSS));
        return;
    }

    if(!dateInput){
        $("#datepicker").after($("<span>").text("Date is Empty").addClass(errorTextCSS));
        return;
    }
    console.log(dateInput);
    if(!moment(dateInput).isValid()){
        $("#datepicker").after($("<span>").text("Invalid Date").addClass(errorTextCSS));
        $( "#datepicker" ).val("");
        return;
    }else{
        dateInput = moment(dateInput).format("YYYY-MM-DD");
    }

    let tempObj = {};
    let historicPriceObj = {};

    tempObj = await assestFunctions[financeOption].asset(nameInput);
       
    // Checks if api has stock name 
    if(!tempObj){
        $("#stock-input").after($("<span>").text(`${financeOption} Not Found`).addClass(errorTextCSS));
        return;
    }

    // Append new object if it doesn't exist
    if(!stockObjList[tempObj.id]){
        stockObjList[tempObj.id] = tempObj;         // Update the Obj List

        // Create a button 
        $(`.${financeOption}-data`).append($("<button>").addClass("stock-btn").text(tempObj.name).attr('data-crpto-id', tempObj.id));

    }else{ // The searched stock is already selected
        $("#stock-input").after($("<span>").text(`Selected ${financeOption} already picked`).addClass(errorTextCSS));
    }

    console.log("getting histoy",tempObj.symbol, dateInput );
    historicPriceObj = await assestFunctions[financeOption].historicPrice(tempObj.symbol, dateInput );

    // Update crypto list with historic prices
    stockObjList[tempObj.id].prevPrice = historicPriceObj.prevPrice;
    stockObjList[tempObj.id].prevDate = historicPriceObj.prevDate;
    
    console.table(stockObjList[tempObj.id]);

    // Reset fields
    $("#stock-input").val("");
    $('#datepicker').datepicker('setDate', null);
}


var displayData = function(id){
    stockObj = stockObjList[id];

    $(".stock-name").text(stockObj.name);
    $(".current-price").text(`Current Price: ${stockObj.currPrice}`);
    $(".current-date").text(`Current Date: ${stockObj.currDate}`);
    $(".previous-price").text(`Previous Price: ${stockObj.prevPrice}`);
    $(".previous-date").text(`Previous Date: ${stockObj.prevDate}`);

}

var calculate = function(){
    
}

// Jquery UI datepicker
$("#datepicker").datepicker({
    dateFormat: "yy-mm-d",
    maxDate: 0
    
});

$(".stock-form").on("submit",getUserInputHandler);

$('.finance-option').on("change",function() {
    $(".stock-input-label").text("Search for " + $(this).val() + ":");

    if ($(this).val() == "Stock"){
        // Weekends are disabled for stocks
        $("#datepicker").datepicker("option", {beforeShowDay: $.datepicker.noWeekends});
        console.log($("#datepicker"));
    }else if($(this).val() == "Crypto"){
        $("#datepicker").datepicker("option", {beforeShowDay: null});
    }
    

});

