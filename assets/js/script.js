
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

    let id = getCyprotAssetName(stockName);
    console.log(id);
    // Creates an object in the background 
    if(!id){
        $("#stock-input").after($("<span>").text("Stock Not Found").addClass("error-text"));
    }else{

        // Create a button
    $(".stock-data").append($("<button>").addClass("stock-btn").text(id));

    }

    
    
}




$(".stock-form").on("submit",getUserInputHandler);
