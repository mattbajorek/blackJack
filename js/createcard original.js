// Initialize numbers and symbols
var numbers = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"];
var symbols = ["\u2660","\u2663","\u2665","\u2666"]; // spades, clubs, hearts, diamonds
var countNumbers
var countSymbols

// Create card steps
function createcards(amount) {
    while (amount>0) {
        // Card number
        cardNumber = 1;

        // Generate random number (0-12) for numbers, (0-3) for symbols
        countNumbers = Math.floor( (Math.random() * 12) + 1);
        countSymbols = Math.floor( (Math.random() * 3) + 1);

        // Make card
        $(".holder").append('<div class="card"></div>');

        // Adds number div classes
        $(".card").append('<div class="number top-number"></div>');
        $(".card").append('<div class="number bottom-number"></div>');
        // Changes the number to the button selected
        $(".number").text( numbers[countNumbers] );
        // Positions the number properly on card
        numberPosition( numbers[countNumbers] );

        // Adds symbol div classes
        $(".card").append('<div class="symbol top-symbol"></div>');
        $(".card").append('<div class="symbol bottom-symbol"></div>');
        // Changes the top and bottom symbols to the button selected
        $(".top-symbol").text( symbols[countSymbols] );
        $(".bottom-symbol").text( symbols[countSymbols] );
        // Size the symbol properly on card
        symbolSize( symbols[countSymbols],"small" );

        // Adds center symbol
        centerSymbol();
        // Correct symbol size(s)
        symbolSize( symbols[countSymbols],"large" );

        // Correct symbol colors
        symbolColor();

        // Continue making cards
        amount--;
        createcards(amount);
    }
}

// Deletes cards
function deletecards() {
    while ($(".holder").find(".card").length > 0) {
        $(".card").remove();
    }
}

// Recreates new card
/*var recreate = function () {
    if (!$(".holder").find(".card").length > 0) {
        $(".holder").append("<div class=\"card\"></div>");
    } else {
        $(".card").remove();
        recreate();
    }
}*/

// Positions the number properly on card
var numberPosition = function(num) {
    var classes = [".top-number", ".bottom-number"];
    var position = ["left", "right"];

    for (var i=0; i<=1; i++) {
        if ( num > 1 && num < 10 ) {
            $(classes[i]).css(position[i], "10px");
        } else if ( num == "J") {
            $(classes[i]).css(position[i], "13px");
        } else if ( num == 10) {
            $(classes[i]).css(position[i], "2px");
        } else {
            $(classes[i]).css(position[i], "5px");
        }
    }
}

// Sizes the top and bottom symbols properly on card
var symbolSize = function(sym,size) {
    var pixels = [], symbol = [];
    switch (size) {
        case "small": pixels = ["45px","40px","50px"]; symbol = [".top-symbol",".bottom-symbol"]; break;
        case "large": pixels = ["65px","60px","70px"]; symbol = [".center-symbol"]; break;
    }
    for (var i = 0; i<symbol.length; i++) {
        if ( sym == "\u2665" ) { // unicode for hearts
            $(symbol[i]).css("font-size", pixels[0]);
        } else if ( sym == "\u2663" ) { // unicode for clubs
            $(symbol[i]).css("font-size", pixels[1]);
        } else { // spades and hearts
            $(symbol[i]).css("font-size", pixels[2]);
        }
    }
}

// Adds the center element
var centerSymbol = function() {
    if (countNumbers < 10) {
        // Make symbol
        makeCenterSymbol(countNumbers+1);
        // Position the symbol
        switch ( numbers[countNumbers] ) {
            case "A": {
                $(".center-symbol").css("top", "140px");
                $(".center-symbol").css("left", "105px");
            }
            break;
            case "2": {
                pos2();
            }
            break;
            case "3": {
                pos2();
                $(".center-symbol:eq(2)").css("top", "140px");
                $(".center-symbol:eq(2)").css("left", "105px");
            }
            break;
            case "4": {
                pos4();
            }
            break;
            case "5": {
                pos5();
            }
            break;
            case "6": {
                pos6();
            }
            break;
            case "7": {
                pos7();
            }
            break;
            case "8": {
                pos7();
                $(".center-symbol:eq(7)").css("top", "190px");
                $(".center-symbol:eq(7)").css("left", "110px");
            }
            break;
            case "9": {
                pos9();
            }
            break;
            case "10": {
                pos9();
                $(".center-symbol:eq(4)").css("top", "70px");
                $(".center-symbol:eq(4)").css("left", "105px");
                $(".center-symbol:eq(9)").css("top", "210px");
                $(".center-symbol:eq(9)").css("left", "105px");
            }
            break;
        }
    } else {
        // Change symbol to picture and add extra center symbols
        switch ( numbers[countNumbers] ) {
            case "J": {
                changeSuitImage("J");
            }
            break;
            case "Q": {
                changeSuitImage("Q");
            }
            break;
            case "K": {
                changeSuitImage("K");
            }
            break;
        }
    }
}

// Makes center-symbol
var makeCenterSymbol = function(times) {
    var i = 0;
    while (i < times) {
        // Increment i
        i++
        // Add div
        $(".card").append('<div class="symbol center-symbol"></div>');
        // Add symbol text
        $(".center-symbol:last-child").text($(".top-symbol").text());
    }
    // Position the symbol
    $(".center-symbol").css("position", "absolute");
}

// Position functions
var pos2 = function() {
    $(".center-symbol:eq(0)").css("top", "40px");
    $(".center-symbol:eq(0)").css("left", "105px");
    $(".center-symbol:eq(1)").css("top", "240px");
    $(".center-symbol:eq(1)").css("left", "105px");
}
var pos4 = function() {
    $(".center-symbol:eq(0)").css("top", "40px");
    $(".center-symbol:eq(0)").css("left", "55px");
    $(".center-symbol:eq(1)").css("top", "40px");
    $(".center-symbol:eq(1)").css("left", "155px");
    $(".center-symbol:eq(2)").css("top", "240px");
    $(".center-symbol:eq(2)").css("left", "55px");
    $(".center-symbol:eq(3)").css("top", "240px");
    $(".center-symbol:eq(3)").css("left", "155px");
}
var pos5 = function() {
    pos4();
    $(".center-symbol:eq(4)").css("top", "140px");
    $(".center-symbol:eq(4)").css("left", "105px");
}
var pos6 = function() {
    pos4();
    $(".center-symbol:eq(4)").css("top", "140px");
    $(".center-symbol:eq(4)").css("left", "55px");
    $(".center-symbol:eq(5)").css("top", "140px");
    $(".center-symbol:eq(5)").css("left", "155px");
}
var pos7 = function() {
    pos6();
    $(".center-symbol:eq(6)").css("top", "90px");
    $(".center-symbol:eq(6)").css("left", "105px");
}
var pos9 = function() {
    pos5();
    $(".center-symbol:eq(5)").css("top", "100px");
    $(".center-symbol:eq(5)").css("left", "55px");
    $(".center-symbol:eq(6)").css("top", "100px");
    $(".center-symbol:eq(6)").css("left", "155px");
    $(".center-symbol:eq(7)").css("top", "180px");
    $(".center-symbol:eq(7)").css("left", "55px");
    $(".center-symbol:eq(8)").css("top", "180px");
    $(".center-symbol:eq(8)").css("left", "155px");
}

var changeSuitImage = function() {
    var suit;
    if (symbols[countSymbols] == "\u2663") {// clubs
        suit = "club";
    } else if (symbols[countSymbols] == "\u2660") { // spades
        suit = "spade";
    } else if (symbols[countSymbols] == "\u2665") { // hearts
        suit = "heart";
    } else { // diamonds
        suit = "diamond";
    }
    // Create picture div
    $(".card").append('<div class="symbol center-symbol"><img src="images/" + suit + numbers[countNumbers] + ".png"/></div>');
    // Position the picture
    $(".center-symbol:eq(0)").css("position", "absolute");
    $(".center-symbol:eq(0)").css("top", "57px");
    $(".center-symbol:eq(0)").css("left", "50px");
    // Create symbols
    makeCenterSymbol(2);
    // Position the symbols
    $(".center-symbol:eq(1)").css("top", "50px");
    $(".center-symbol:eq(1)").css("left", "55px");
    $(".center-symbol:eq(2)").css("top", "230px");
    $(".center-symbol:eq(2)").css("left", "155px");
    if (suit == "club") {
        $(".center-symbol:eq(2)").css("top", "240px");
    }
    // Rotate second symbol
    $(".center-symbol:eq(2)").css("-ms-transform", "rotate(180deg)");
    $(".center-symbol:eq(2)").css("-webkit-transform", "rotate(180deg)");
    $(".center-symbol:eq(2)").css("transform", "rotate(180deg)");
}

// Changes the color according to the symbol
var symbolColor = function() {
    if ( symbols[countSymbols] == "\u2665" || symbols[countSymbols] == "\u2666") { // unicode for hearts and diamonds
        $(".number").css("color", "red");
        $(".symbol").css("color", "red");
    } else {
        $(".number").css("color", "black");
        $(".symbol").css("color", "black");
    }
}