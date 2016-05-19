//Initialize variables
    var chipColors = ["white","red","blue","green","black"];
    var chipDivisors = [500,100,50,25,10];

// Create chips steps
function createChips(moneySelection) {
    // Make chips
    for (var i=0; i<chipColors.length; i++) {
        // Make chip
        $(".holder-chips").append('<div class="chip ' + chipColors[i] +'"></div>');
        // Make image and font
        $("." + chipColors[i]).append('<img class="' + chipColors[i] + '"src="images/' + chipColors[i] + '.png"/>');
        $("." + chipColors[i]).append('<h2>$' + moneySelection/chipDivisors[i] + '</h2>');
        // Size the font
        $("h2").css("font-size", 60*fraction + "px");
    }
}