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
    $(".holder-chips").append('<h2 class="total" value= ' + moneySelection + '>Total: $' + comma(moneySelection) + '</h2>');
    // Loop for making chips, their labels, and their amounts
    for (var i=0; i<chipColors.length; i++) {
        // Make chip
        $(".holder-chips").append('<div class="chip ' + chipColors[i] +'" value="' + moneySelection/chipDivisors[i] + '"></div>');
        // Make image and font
        $("." + chipColors[i]).append('<img src="images/' + chipColors[i] + '.png"/>');
        $("." + chipColors[i]).append('<h2>$' + moneySelection/chipDivisors[i] + '</h2>');
        $("." + chipColors[i]).append('<h2 class="amount ' + chipType[i] + '">x' + chipAmount[i] + '</h2>');
        // Size the font
        $("h2").css("font-size", 60*fraction + "px");
        $("." + chipType[i]).css("left", 125*fraction + "px"); // top: 150px;
    }
}

// Listen for when chips are clicked to place bet
function betListener() {
    var originalTotal = $(".total").attr("value");
    var betting = 0;
    $(".wrapper").on("click",".chip",function(){
        // Check if already buttons
        if ($(".holder-buttons").find(".clear-bet").length == 0) {
            createButtons("place-bet","Place Bet");
            createButtons("clear-bet","Clear Bet");
        }
        // Get total
        var total = $(".total").attr("value");
        // Subtract total with chip amount
        var bet = $(this).attr("value");
        total -= bet;
        // Update total attribute and text
        $(".total").attr("value",total);
        $(".total").text("Total: $" + comma(total));

        // Add bet amount to total
        betting += Number(bet);
        // Change wording
        $(".holder.better > h2").text("Bet: $" + comma(betting));

        // Check if already chip in middle, then remove
        if ($(".holder.better").find(".chip").length > 0) {
            $(".holder.better .chip").remove();
        }
        
        // Move chip to middle
        var chip = $(this).clone();
        $(".holder.better").append(chip);
        // Remove amount
        $(".holder.better .amount").remove();
        // Resize chip
        $(".holder.better .chip").css({height: 155*fraction + "px", width: 155*fraction + "px", position: "absolute", bottom: "-1000%"});
        // Animate chip
        animateChip();
    });
    // Change back to original total
    $(".wrapper").on("click",".clear-bet",function(){
        // Clear total
        $(".total").attr("value",originalTotal);
        $(".total").text("Total: $" + comma(originalTotal));
        // Clear bet
        $(".holder.better > h2").text("Bet: $0");
        // Remove chip
        $(".holder.better .chip").remove();
    });
}

// Chip animation
function animateChip() {
    // Jquery animate
    $(".holder.better .chip").animate({bottom: '0'}, {duration: 500});
    // CSS animation!!!
}