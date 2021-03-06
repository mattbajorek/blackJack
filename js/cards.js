// Initialize numbers and symbols
var numbers = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"];
var symbols = ["\u2660","\u2663","\u2665","\u2666"]; // spades, clubs, hearts, diamonds
var randomNumber;
var randomSymbol;
var cardNumber = 1;
var dealerScore = [];
var playerScore = [];

// Fraction changes size of card to the fractional percentage
var fraction = 1/1.5;

// Size the holder
function holderSize(holder) {
    $("." + holder).css("height", 350*fraction + "px");
    $("." + holder).css("width", 400*fraction + "px");
    // Add white border
    if (holder != "better") {
        $("." + holder).css("border", "2px solid white");
    }
}

// Create card steps
function createCards(person,amount,lastCard) {
    while (amount>0) {
        // Generate random number (0-12) for numbers, (0-3) for symbols
        randomNumber = Math.floor( (Math.random() * 12) + 1);
        randomSymbol = Math.floor( (Math.random() * 3) + 1);

        // Save dealer or player numbers
        if (person == "dealer") {
            dealerScore.push(randomNumber+1);
        } else {
            playerScore.push(randomNumber+1);
        }

        // Make card
        $("."+ person).append('<div class="card card' + cardNumber + '"></div>');
        // Size the card
        $(".card" + cardNumber).css("height", 350*fraction + "px");
        $(".card" + cardNumber).css("width", 250*fraction + "px");
        // Count the card
        var count = $("."+ person + " .card").length;
        // Position the card
        $(".card" + cardNumber).css("left", 50*fraction*(count-1) + "px");

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

        // Cover first dealer card
        if (person == "dealer" && count == 1) {
            $(".card" + cardNumber).append('<img class="back" src="images/back.png"/>');
            $(".card" + cardNumber).css("border","none");
            $(".back").css("height", 350*fraction + "px");
            $(".back").css("width", 250*fraction + "px");
        }
        // Animate the card down
        animateCard(cardNumber,person,lastCard);

        // Continue making cards
        cardNumber++;
        amount--;
    }
}

// Card animation
function animateCard(cardNumber,person,lastCard) {
    if (cardNumber <= 4) {
        // Delay initial 4 card roll out
        var delayAmount = (cardNumber-1) * 500;
        $(".card" + cardNumber).delay(delayAmount).animate({top: '0'}, {duration: 500});
    } else {
        if (person == "player") {
            // Normal animation for all subsequent cards
            $(".card" + cardNumber).animate({top: '0'}, {duration: 500});
        } else {
            // Delay dealer card rolls
            var delayAmount = (cardNumber-lastCard) * 500;
            $(".card" + cardNumber).delay(delayAmount).animate({top: '0'}, {duration: 500});
        }
    }
}

// Deletes cards
function deletecards() {
    while ($(".card").length > 0) {
        $(".card").remove();
    }
    // Reinitiallize variables
    cardNumber = 1;
    dealerScore = [];
    playerScore = [];
}

// Positions the number properly on card
function numberPosition(num) {
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
function symbolSize(sym,size) {
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
function positioning(num,top,left) {
    for (var i=0; i<num.length; i++) {
        $(".card" + cardNumber + " .center-symbol:eq(" + num[i] +")").css("top", top[i]);
        $(".card" + cardNumber + " .center-symbol:eq(" + num[i] +")").css("left", left[i]);
    }
}

// Adds the center element
function centerSymbol() {
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
function makeCenterSymbol(times) {
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
function pos2() {
    var num = [0,1];
    var top = ["11.4285714286%","68.5714285714%"]; /*40px, 240px vertical*/
    var left = ["42%","42%"]; /*105px, 105px horizontal*/
    positioning(num,top,left);
}
function pos4() {
    var num = [0,1,2,3];
    var top = ["11.4285714286%","11.4285714286%","68.5714285714%","68.5714285714%"]; /*40px, 40px, 240px, 240px vertical*/
    var left = ["22%","62%","22%","62%"]; /*55px, 155px, 55px, 155px horizontal*/
    positioning(num,top,left);
}
function pos5() {
    pos4();
    var num = [4];
    var top = ["40%"]; /*140px vertical*/
    var left = ["42%"]; /*105px horizontal*/
    positioning(num,top,left);
}
function pos6() {
    pos4();
    var num = [4,5];
    var top = ["40%","40%"]; /*140px, 140px vertical*/
    var left = ["22%","62%"]; /*55px, 155px horizontal*/
    positioning(num,top,left);
}
function pos7() {
    pos6();
    var num = [6];
    var top = ["40%"]; /*140px vertical*/
    var left = ["42%"]; /*105px horizontal*/
    positioning(num,top,left);
}
function pos9() {
    pos5();
    var num = [5,6,7,8];
    var top = ["28.5714285714%","28.5714285714%","51.4285714286%","51.4285714286%"]; /*100px, 100px, 180px, 180px vertical*/
    var left = ["22%","62%","22%","62%"]; /*55px, 155px, 55px, 155px horizontal*/
    positioning(num,top,left);
}

function changeSuitImage() {
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
function symbolColor() {
    if ( symbols[randomSymbol] == "\u2665" || symbols[randomSymbol] == "\u2666") { // unicode for hearts and diamonds
        $(".card" + cardNumber + " .number").css("color", "red");
        $(".card" + cardNumber + " .symbol").css("color", "red");
    } else {
        $(".card" + cardNumber + " .number").css("color", "black");
        $(".card" + cardNumber + " .symbol").css("color", "black");
    }
}

// Calculates the score
function calScore(person) {
    // Initialize variables
    var sumPerson = 0;
    var numAces = 0;
    var personScore = [];
    // Select person
    if (person == "dealer") {
        personScore = dealerScore;
    } else {
        personScore = playerScore;
    }
    // Return 0 if no cards shown
    if (personScore.length == 0) {
        return sumPerson;
    }
    // For loop to add cards
    for (var i=0; i<personScore.length; i++) {
        // Add all cards other than Aces, counts Aces
        if (personScore[i] >= 10) {
            sumPerson += 10;
        } else if (personScore[i] < 10 && personScore[i] > 1) {
            sumPerson += personScore[i];
        } else {
            numAces++;
        }
    }
    // Determine whether to add 1 or 11 for Aces
    if (numAces == 0) {
        return sumPerson;
    } else {
        while (numAces > 0) {
            if (sumPerson < 11) {
                sumPerson += 11;
            } else {
                sumPerson += 1;
            }
            numAces--;
        }
        return sumPerson;
    }
}

// Dealer plays stand on all 17s
function dealerplay(lastCard) {
    // Remove covered card
    $(".back").remove();
    // Keep hitting until 17 or greater
    while (calScore("dealer") < 17) {
        createCards("dealer",1,lastCard);
    }
}

// Dealer plays stand on all 17s
function calWin(lastCard) {
    window.setTimeout(function () {
        // Check to see of 11 possible outcomes
        if (calScore("player") > 21 && calScore("dealer") > 21) {
            h2Text("Player busts and dealer busts! No winner!");
        } else if (calScore("player") == 21 && calScore("dealer") > 21) {
            h2Text("Player has blackjack! Dealer busts! Player wins double!");
        } else if (calScore("player") > 21 && calScore("dealer") == 21) {
            h2Text("Dealer has blackjack! Player busts! Dealer wins!");
        } else if (calScore("player") == 21 && calScore("dealer") == 21) {
            h2Text("Player and Dealer have blackjack! No winner!");
        } else if (calScore("player") == 21 && calScore("dealer") < 21) {
            h2Text("Player has blackjack! Player wins double!");
        } else if (calScore("player") < 21 && calScore("dealer") == 21) {
            h2Text("Dealer has blackjack! Dealer wins!");
        } else if (calScore("player") > 21 && calScore("dealer") < 21) {
            h2Text("Player busts! Dealer wins!");
        } else if (calScore("player") < 21 && calScore("dealer") > 21) {
            h2Text("Dealer busts! Player wins!");
        } else if (calScore("player") > calScore("dealer")) {
            h2Text("Player wins by " + (calScore("player")-calScore("dealer")) + "!");
        } else if (calScore("player") < calScore("dealer")) {
            h2Text("Dealer wins by " + (calScore("dealer")-calScore("player")) + "!");
        } else if (calScore("player") == calScore("dealer")) {
            h2Text("No winner!");
        }
    }, (cardNumber-lastCard+1)*500);
}

function h2Text(message) {
    $(".holder-better h2").text(message);
}