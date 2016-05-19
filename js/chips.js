//Initialize variables
var chipColors = ["white","red","blue","green","black"];
var chipDivisors = [500,100,50,25,10];
var chipType = ["one","five","ten","twenty","fifty"];
var chipAmount = [25,15,5,5,5];

// Turn money with commas
function comma(n) {
    return n.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
}

// Create chips steps
function createChips(moneySelection) {
    // Show total money
    $(".holder-chips").append('<h2>Total: $' + comma(moneySelection) + '</h2>');
    // Loop for making chips, their labels, and their amounts
    for (var i=0; i<chipColors.length; i++) {
        // Make chip
        $(".holder-chips").append('<div class="chip ' + chipColors[i] +'"></div>');
        // Make image and font
        $("." + chipColors[i]).append('<img class="' + chipColors[i] + '" src="images/' + chipColors[i] + '.png"/>');
        $("." + chipColors[i]).append('<h2>$' + moneySelection/chipDivisors[i] + '</h2>');
        $("." + chipColors[i]).append('<h2 class="' + chipType[i] + '">x' + chipAmount[i] + '</h2>');
        // Size the font
        $("h2").css("font-size", 60*fraction + "px");
        $("." + chipType[i]).css("left", 125*fraction + "px"); // top: 150px;
    }
}

// Create buttons steps
function createButtons(className,textName) {
    $(".holder-buttons").append('<button class="' + className + '">' + textName + '</button>');
    //Size the buttons
    $(".holder-buttons button").css("font-size", 50*fraction + "px");
}

// Remove buttons steps
function removeButtons(className) {
    if (arguments.length == 0) {
        $(".holder-buttons").empty();
    } else {
        $("." + className).remove();
    }
    
}

// End of play
function roundEnd() {
    // Remove hit and stand buttons
    removeButtons();
    // Dealer plays
    dealerplay();
    // Find winner
    calWin();
    // Create bet button
    createButtons("bet","Bet");
}