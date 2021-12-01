const errorTextCSS = "error-text";

// When user clicks submit button
var getUserInputHandler = async function(event){
    event.preventDefault();
    $(".error-text").remove();

    let financeOption = $(".finance-option:checked").val().toLowerCase();
    let nameInput = $("#stock-input").val().trim();
    let dateInput = currentDate = $( "#datepicker" ).datepicker( "getDate" );

    if (!nameInput){
        // add some tailwind css to red text
        $("#stock-input").after($("<span>").text("Stock Name Empty").addClass(errorTextCSS));
        return;
    }

    if(!dateInput){
        $("#datepicker").after($("<span>").text("Date is Empty").addClass(errorTextCSS));
        return;
    }

    let tempObj = {};

    if (financeOption == "stock") tempObj = await getStockValue(nameInput);
       
    else if(financeOption == "crypto") tempObj = await getCyprotAssetName(nameInput);

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

    if(financeOption == "Crypto"){

        let historicPriceObj = await getHistoricalData(tempObj.id, dateInput );
        // Update crypto list with historic prices
        stockObjList[tempObj.id].prevPrice = historicPriceObj.prevPrice;
        stockObjList[tempObj.id].prevDate = historicPriceObj.prevDate;
    }
    console.table(stockObjList[tempObj.id]);

    // Reset fields
    $("#stock-input").val("");
    $('#datepicker').datepicker('setDate', null);
}


var calculate = function(){
    
}

// Jquery UI datepicker
$( "#datepicker" ).datepicker({
    dateFormat: "yy-mm-d"
});

$(".stock-form").on("submit",getUserInputHandler);

$('.finance-option').on("change",function() {
    $(".stock-input-label").text("Search for " + $(this).val() + ":");

});

