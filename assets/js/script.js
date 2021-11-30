var cryptoButtonList = []; // Track button list


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

    if(cryptoButtonList.indexOf(cryptoObj.id) == -1){ // If it is a new crypto added to list

        // Create a button if crypto exists
        $(".stock-data").append($("<button>")
            .addClass("stock-btn")
            .text(cryptoObj.name)
            .attr('data-crpto-id', cryptoObj.id));

        // Append to button list to track
        cryptoButtonList.push(cryptoObj.id);
        
    }else{
        $("#stock-input").after($("<span>").text("Selected stock already picked").addClass("error-text"));
    }

    await getHistoricalData(cryptoObj.id, cryptoDate );

    // calculate the profits

}


var calculate = function(){
    
}

// Jquery UI datepicker
$( "#datepicker" ).datepicker({
    dateFormat: "yy-mm-d"
});
$(".stock-form").on("submit",getUserInputHandler);


