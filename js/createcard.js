// Initialize numbers and symbols
var numbers = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"];
var symbols = ["\u2660","\u2663","\u2665","\u2666"]; // spades, clubs, hearts, diamonds
var randomNumber
var randomSymbol
var cardNumber = 1;
var fraction = 1/2;

// Create card steps
function createcards(amount) {
    while (amount>0) {
        // Generate random number (0-12) for numbers, (0-3) for symbols
        randomNumber = Math.floor( (Math.random() * 12) + 1);
        randomSymbol = Math.floor( (Math.random() * 3) + 1);

        // Make card
        $(".holder").append('<div class="card card' + cardNumber + '"></div>');
        // Size the card
        $(".card" + cardNumber).css("height", 350*fraction + "px");
        $(".card" + cardNumber).css("width", 250*fraction + "px");

        // Adds number div classes
        $(".card" + cardNumber).append('<div class="number top-number"></div>');
        $(".card" + cardNumber).append('<div class="number bottom-number"></div>');
        // Changes the number to the button selected
        $(".card" + cardNumber + " .number").text( numbers[randomNumber] );
        // Size the number
        $(".card" + cardNumber + " .number").css("font-size", 35*fraction + "px");
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

// Positions the number properly on card
var numberPosition = function(num) {
    var classes = [".card" + cardNumber + " .top-number", ".card" + cardNumber + " .bottom-number"];
    var position = ["left", "right"];

    for (var i=0; i<=1; i++) {
        if ( num > 1 && num < 10 ) {
            $(classes[i]).css(position[i], "4%"); /*10px horizontal*/
        } else if ( num == "J") {
            $(classes[i]).css(position[i], "5.2%"); /*13px horizontal*/
        } else if ( num == 10) {
            $(classes[i]).css(position[i], "0.8%"); /*2px horizontal*/
        } else {
            $(classes[i]).css(position[i], "2%"); /*5px horizontal*/
        }
    }
}

// Sizes the top and bottom symbols properly on card
var symbolSize = function(sym,size) {
    var pixels = [], symbol = [];
    switch (size) {
        case "small": pixels = [45*fraction + "px", 40*fraction + "px", 50*fraction + "px"]; symbol = [".card" + cardNumber + " .top-symbol",".card" + cardNumber + " .bottom-symbol"]; break;
        case "large": pixels = [65*fraction + "px", 60*fraction + "px", 70*fraction + "px"]; symbol = [".card" + cardNumber + " .center-symbol"]; break;
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

// Loop for positioning center symbol
var positioning = function(num,top,left) {
    for (var i=0; i<num.length; i++) {
        $(".card" + cardNumber + " .center-symbol:eq(" + num[i] +")").css("top", top[i]);
        $(".card" + cardNumber + " .center-symbol:eq(" + num[i] +")").css("left", left[i]);
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
                var num = [0];
                var top = ["40%"]; /*140px vertical*/
                var left = ["42%"]; /*105px horizontal*/
                positioning(num,top,left);
            }
            break;
            case "2": {
                pos2();
            }
            break;
            case "3": {
                pos2();
                var num = [2];
                var top = ["40%"]; /*140px vertical*/
                var left = ["42%"]; /*105px horizontal*/
                positioning(num,top,left);
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
                var num = [7];
                var top = ["54.2857142857%"];   /*190px vertical*/
                var left = ["44%"];  /*110px horizontal*/
                positioning(num,top,left);
            }
            break;
            case "9": {
                pos9();
            }
            break;
            case "10": {
                pos9();
                var num = [4,9];
                var top = ["20%","60%"]; /*70px, 210px vertical*/
                var left = ["42%","42%"]; /*105px, 105px horizontal*/
                positioning(num,top,left);
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
    var num = [0,1];
    var top = ["11.4285714286%","68.5714285714%"]; /*40px, 240px vertical*/
    var left = ["42%","42%"]; /*105px, 105px horizontal*/
    positioning(num,top,left);
}
var pos4 = function() {
    var num = [0,1,2,3];
    var top = ["11.4285714286%","11.4285714286%","68.5714285714%","68.5714285714%"]; /*40px, 40px, 240px, 240px vertical*/
    var left = ["22%","62%","22%","62%"]; /*55px, 155px, 55px, 155px horizontal*/
    positioning(num,top,left);
}
var pos5 = function() {
    pos4();
    var num = [4];
    var top = ["40%"]; /*140px vertical*/
    var left = ["42%"]; /*105px horizontal*/
    positioning(num,top,left);
}
var pos6 = function() {
    pos4();
    var num = [4,5];
    var top = ["40%","40%"]; /*140px, 140px vertical*/
    var left = ["22%","62%"]; /*55px, 155px horizontal*/
    positioning(num,top,left);
}
var pos7 = function() {
    pos6();
    var num = [6];
    var top = ["40%"]; /*140px vertical*/
    var left = ["42%"]; /*105px horizontal*/
    positioning(num,top,left);
}
var pos9 = function() {
    pos5();
    var num = [5,6,7,8];
    var top = ["28.5714285714%","28.5714285714%","51.4285714286%","51.4285714286%"]; /*100px, 100px, 180px, 180px vertical*/
    var left = ["22%","62%","22%","62%"]; /*55px, 155px, 55px, 155px horizontal*/
    positioning(num,top,left);
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
    // Size the picture
    $(".card" + cardNumber + " img").css("height", 236*fraction + "px");
    $(".card" + cardNumber + " img").css("width", 146*fraction + "px");
    // Position the picture
    $(".card" + cardNumber + " .center-symbol:eq(0)").css("position", "absolute");
    var num = [0];
    var top = ["16.2857142857%"]; /*57px vertical*/
    var left = ["20%"]; /*50px horizontal*/
    positioning(num,top,left);
    // Create symbols
    makeCenterSymbol(2);
    // Position the symbols
    var num = [1,2];
    var top = ["14.2857142857%","65.7142857143%"]; /*50px, 230px vertical*/
    var left = ["22%","62%"]; /*55px, 155px horizontal*/
    positioning(num,top,left);
    // Position club properly
    if (suit == "club") {
        $(".card" + cardNumber + " .center-symbol:eq(2)").css("top", "68.5714285714%"); /*240px vertical*/
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