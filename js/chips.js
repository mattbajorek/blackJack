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
        $(".holder-chips").append('<div class="chip chip-relative ' + chipColors[i] +'" value="' + moneySelection/chipDivisors[i] + '"></div>');
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
    $(".wrapper").on("click",".chip-relative",function(){
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
        if ($(".holder.better").find(".chip-absolute").length > 0) {
            window.setTimeout(function () {
                $(".chip-absolute:eq(0)").remove();
            }, 1000);
        }

        // Make chip
        var color = $(this).attr("class").split("").splice(19).join("");
        var value = $(this).attr("value");
        $(".holder.better").append('<div class="chip chip-absolute ' + color + '"></div>');
        // Make image and font
        $("." + color).append('<img src="images/' + color + '.png"/>');
        $("." + color).append('<h2>$' + value + '</h2>');
        // Size the font
        $("h2").css("font-size", 60*fraction + "px");
        // Resize chip
        $(".chip-absolute").css({height: 155*fraction + "px", width: 155*fraction + "px"});

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
        $(".holder.better .chip-absolute").remove();
    });
    // Dealer out cards
    $(".wrapper").on("click",".place-bet",function(){
        // Remove listeners
        $(".wrapper").off("click",".chip-relative");
        // Remove bet and add hit and stand
        removeButtons();
        // Alternate between player and dealer cards
        createCards("player",1);
        createCards("dealer",1);
        createCards("player",1);
        createCards("dealer",1);
        // Create hit and stand buttons after cards are dealt
        window.setTimeout(function () {
            createButtons("hit","Hit");
            createButtons("stand","Stand");
        }, 2000);
    });
}

// Chip animation
function animateChip() {
    // CSS animation
    $(".holder.better .chip-absolute").addClass("animation-chip");
    $(".holder.better .chip-absolute").one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {
        $(".holder.better .chip-absolute").addClass('position-end');
    });
}