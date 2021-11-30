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

    let cyrptoObj = await getCyprotAssetName(cryptoName) // getCyprotAssetName returns a promise (requires .then())
    
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

    
    
}

// Jquery UI datepicker
$( "#datepicker" ).datepicker({
    dateFormat: "yy-mm-d"
});
$(".stock-form").on("submit",getUserInputHandler);


