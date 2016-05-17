// Initialize numbers and symbols
var numbers = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"];
var symbols = ["\u2660","\u2663","\u2665","\u2666"]; // spades, clubs, hearts, diamonds
var randomNumber
var randomSymbol
var cardNumber = 1;

// Create card steps
function createcards(amount) {
    while (amount>0) {
        // Generate random number (0-12) for numbers, (0-3) for symbols
        randomNumber = Math.floor( (Math.random() * 12) + 1);
        randomSymbol = Math.floor( (Math.random() * 3) + 1);

        // Make card
        $(".holder").append('<div class="card card' + cardNumber + '"></div>');

        // Adds number div classes
        $(".card" + cardNumber).append('<div class="number top-number"></div>');
        $(".card" + cardNumber).append('<div class="number bottom-number"></div>');
        // Changes the number to the button selected
        $(".card" + cardNumber + " .number").text( numbers[randomNumber] );
        // Positions the number properly on card
        numberPosition( numbers[randomNumber] );

        // Adds symbol div classes
        $(".card" + cardNumber).append('<div class="symbol top-symbol"></div>');
        $(".card" + cardNumber).append('<div class="symbol bottom-symbol"></div>');
        // Changes the top and bottom symbols to the button selected
        $(".card" + cardNumber + " .top-symbol").text( symbols[randomSymbol] );
        $(".card" + cardNumber + " .bottom-symbol").text( symbols[randomSymbol] );
        // Size the symbol properly on card
        symbolSize( symbols[randomSymbol],"small" );

        // Adds center symbol
        centerSymbol();
        // Correct symbol size(s)
        symbolSize( symbols[randomSymbol],"large" );

        // Correct symbol colors
        symbolColor();

        // Continue making cards
        cardNumber++;
        amount--;
    }
}

// Deletes cards
function deletecards() {
    for (var i = 1; i <= cardNumber; i++) {
        $(".card" + i).remove();
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
    var classes = [".card" + cardNumber + " .top-number", ".card" + cardNumber + " .bottom-number"];
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
        case "small": pixels = ["45px","40px","50px"]; symbol = [".card" + cardNumber + " .top-symbol",".card" + cardNumber + " .bottom-symbol"]; break;
        case "large": pixels = ["65px","60px","70px"]; symbol = [".card" + cardNumber + " .center-symbol"]; break;
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
    if (randomNumber < 10) {
        // Make symbol
        makeCenterSymbol(randomNumber+1);
        // Position the symbol
        switch ( numbers[randomNumber] ) {
            case "A": {
                $(".card" + cardNumber + " .center-symbol").css("top", "140px");
                $(".card" + cardNumber + " .center-symbol").css("left", "105px");
            }
            break;
            case "2": {
                pos2();
            }
            break;
            case "3": {
                pos2();
                $(".card" + cardNumber + " .center-symbol:eq(2)").css("top", "140px");
                $(".card" + cardNumber + " .center-symbol:eq(2)").css("left", "105px");
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
                $(".card" + cardNumber + " .center-symbol:eq(7)").css("top", "190px");
                $(".card" + cardNumber + " .center-symbol:eq(7)").css("left", "110px");
            }
            break;
            case "9": {
                pos9();
            }
            break;
            case "10": {
                pos9();
                $(".card" + cardNumber + " .center-symbol:eq(4)").css("top", "70px");
                $(".card" + cardNumber + " .center-symbol:eq(4)").css("left", "105px");
                $(".card" + cardNumber + " .center-symbol:eq(9)").css("top", "210px");
                $(".card" + cardNumber + " .center-symbol:eq(9)").css("left", "105px");
            }
            break;
        }
    } else {
        // Change symbol to picture and add extra center symbols
        switch ( numbers[randomNumber] ) {
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
        $(".card" + cardNumber).append('<div class="symbol center-symbol"></div>');
        // Add symbol text
        $(".card" + cardNumber + " .center-symbol:last-child").text($(".card" + cardNumber + " .top-symbol").text());
    }
    // Position the symbol
    $(".card" + cardNumber + " .center-symbol").css("position", "absolute");
}

// Position functions
var pos2 = function() {
    $(".card" + cardNumber + " .center-symbol:eq(0)").css("top", "40px");
    $(".card" + cardNumber + " .center-symbol:eq(0)").css("left", "105px");
    $(".card" + cardNumber + " .center-symbol:eq(1)").css("top", "240px");
    $(".card" + cardNumber + " .center-symbol:eq(1)").css("left", "105px");
}
var pos4 = function() {
    $(".card" + cardNumber + " .center-symbol:eq(0)").css("top", "40px");
    $(".card" + cardNumber + " .center-symbol:eq(0)").css("left", "55px");
    $(".card" + cardNumber + " .center-symbol:eq(1)").css("top", "40px");
    $(".card" + cardNumber + " .center-symbol:eq(1)").css("left", "155px");
    $(".card" + cardNumber + " .center-symbol:eq(2)").css("top", "240px");
    $(".card" + cardNumber + " .center-symbol:eq(2)").css("left", "55px");
    $(".card" + cardNumber + " .center-symbol:eq(3)").css("top", "240px");
    $(".card" + cardNumber + " .center-symbol:eq(3)").css("left", "155px");
}
var pos5 = function() {
    pos4();
    $(".card" + cardNumber + " .center-symbol:eq(4)").css("top", "140px");
    $(".card" + cardNumber + " .center-symbol:eq(4)").css("left", "105px");
}
var pos6 = function() {
    pos4();
    $(".card" + cardNumber + " .center-symbol:eq(4)").css("top", "140px");
    $(".card" + cardNumber + " .center-symbol:eq(4)").css("left", "55px");
    $(".card" + cardNumber + " .center-symbol:eq(5)").css("top", "140px");
    $(".card" + cardNumber + " .center-symbol:eq(5)").css("left", "155px");
}
var pos7 = function() {
    pos6();
    $(".card" + cardNumber + " .center-symbol:eq(6)").css("top", "90px");
    $(".card" + cardNumber + " .center-symbol:eq(6)").css("left", "105px");
}
var pos9 = function() {
    pos5();
    $(".card" + cardNumber + " .center-symbol:eq(5)").css("top", "100px");
    $(".card" + cardNumber + " .center-symbol:eq(5)").css("left", "55px");
    $(".card" + cardNumber + " .center-symbol:eq(6)").css("top", "100px");
    $(".card" + cardNumber + " .center-symbol:eq(6)").css("left", "155px");
    $(".card" + cardNumber + " .center-symbol:eq(7)").css("top", "180px");
    $(".card" + cardNumber + " .center-symbol:eq(7)").css("left", "55px");
    $(".card" + cardNumber + " .center-symbol:eq(8)").css("top", "180px");
    $(".card" + cardNumber + " .center-symbol:eq(8)").css("left", "155px");
}

var changeSuitImage = function() {
    var suit;
    if (symbols[randomSymbol] == "\u2663") {// clubs
        suit = "club";
    } else if (symbols[randomSymbol] == "\u2660") { // spades
        suit = "spade";
    } else if (symbols[randomSymbol] == "\u2665") { // hearts
        suit = "heart";
    } else { // diamonds
        suit = "diamond";
    }
    // Create picture div
    $(".card" + cardNumber).append('<div class="symbol center-symbol"><img src="images/' + suit + numbers[randomNumber] + '.png"/></div>');
    // Position the picture
    $(".card" + cardNumber + " .center-symbol:eq(0)").css("position", "absolute");
    $(".card" + cardNumber + " .center-symbol:eq(0)").css("top", "57px");
    $(".card" + cardNumber + " .center-symbol:eq(0)").css("left", "50px");
    // Create symbols
    makeCenterSymbol(2);
    // Position the symbols
    $(".card" + cardNumber + " .center-symbol:eq(1)").css("top", "50px");
    $(".card" + cardNumber + " .center-symbol:eq(1)").css("left", "55px");
    $(".card" + cardNumber + " .center-symbol:eq(2)").css("top", "230px");
    $(".card" + cardNumber + " .center-symbol:eq(2)").css("left", "155px");
    if (suit == "club") {
        $(".card" + cardNumber + " .center-symbol:eq(2)").css("top", "240px");
    }
    // Rotate second symbol
    $(".card" + cardNumber + " .center-symbol:eq(2)").css("-ms-transform", "rotate(180deg)");
    $(".card" + cardNumber + " .center-symbol:eq(2)").css("-webkit-transform", "rotate(180deg)");
    $(".card" + cardNumber + " .center-symbol:eq(2)").css("transform", "rotate(180deg)");
}

// Changes the color according to the symbol
var symbolColor = function() {
    if ( symbols[randomSymbol] == "\u2665" || symbols[randomSymbol] == "\u2666") { // unicode for hearts and diamonds
        $(".card" + cardNumber + " .number").css("color", "red");
        $(".card" + cardNumber + " .symbol").css("color", "red");
    } else {
        $(".card" + cardNumber + " .number").css("color", "black");
        $(".card" + cardNumber + " .symbol").css("color", "black");
    }
}