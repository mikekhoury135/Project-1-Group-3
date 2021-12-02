const errorTextCSS = "error-text text-red-600	";
const stockNameCss = "asset-info-header";
const currPriceCss = "asset-info";
const currDateCss = "asset-info";
const prevPriceCss = "asset-info";
const prevDateCss = "asset-info";
const loadContainerCSS = "stock-loading flex justify-center items-center my-1";
const loadCSS = "stock-loading animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900";

const assetButtonCSS = "asset-btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-20 rounded focus:outline-none focus:shadow-outline w-full my-1"


const loadEl = $("<div>").addClass(loadContainerCSS).append($("<div>").addClass(loadCSS));

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
    $('.animate-spin').css("display", "block")
    $(".error-text").remove();

    // show loading
    $(".submit-btn").after(loadEl);


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
        $(`.${financeOption}-data`).append($("<button>").addClass(assetButtonCSS).text(tempObj.name).attr('data-crpto-id', tempObj.id));

    }
    
      console.log("getting histoy",tempObj.symbol, dateInput );
    let historicID = "";
    if (financeOption == 'stock'){
        historicID = tempObj.symbol;
    }else{
        historicID = tempObj.id;
    }
    
    historicPriceObj = await assestFunctions[financeOption].historicPrice(historicID, dateInput );
    console.log(historicPriceObj);
    if(historicPriceObj){
        // Update crypto list with historic prices
        stockObjList[tempObj.id].prevPrice = historicPriceObj.prevPrice;
        stockObjList[tempObj.id].prevDate = historicPriceObj.prevDate;
    }
    
    console.table(stockObjList[tempObj.id]);
    saveAsset();

    displayData(tempObj.id);

    loadEl.remove();
    toggleModal();

    // Reset fields and hide modal
    $("#stock-input").val("");
    $('#datepicker').datepicker('setDate', null);
}

var displayData = function(id){
    stockObj = stockObjList[id];

    $(".stock-name").text(stockObj.name).addClass(stockNameCss);
    $(".current-price").text(`Current Price: ${stockObj.currPrice}`).addClass(currPriceCss);
    $(".current-date").text(`Current Date: ${stockObj.currDate}`).addClass(currDateCss);
    $(".previous-price").text(`Previous Price: ${stockObj.prevPrice}`).addClass(prevPriceCss);
    $(".previous-date").text(`Previous Date: ${stockObj.prevDate}`).addClass(prevDateCss);

}

var displayAssetHandler = function(){
    let assetID = $(this).attr('data-crpto-id');
    displayData(assetID);
}

var saveAsset = function(){
    localStorage.setItem('assetList', JSON.stringify(stockObjList));
}

var loadAsset = function(){
    stockObjList = JSON.parse(localStorage.getItem('assetList'));
}

var toggleModal = function(){
    $(".stock-modal").toggleClass("opacity-0 pointer-events-none");
    $("body").toggleClass("modal-active");
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

$(".data-wrapper").on("click", ".asset-btn", displayAssetHandler);

$(".start-btn").on("click", function(){
    toggleModal();
})

$(".modal-close").on("click",() => toggleModal());

