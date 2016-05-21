$( document ).ready(function() {
	// Show main blackjack screen
	var moneySelection;
	// Money selection button clicks
	$(".baller > button").on("click",function(){
    	// Reset colors for all buttons and error text
    	$(".baller > button").css({'background-color': '#f6b859'});
    	$(".intro-error").text("");
    	// Set color for button pressed and change moneySelection
    	if ($(this).css('background-color') == 'rgb(255, 0, 0)') {
    		$(this).css({'background-color': '#f6b859'});
    	} else {
    		$(this).css({'background-color': '#f00'});
    		moneySelection = Number($(this).attr("num"));
    	}
    });
	
    // Play button click
    $(".play").on("click",function(){
    	if ($(".hundred").css('background-color') == 'rgb(255, 0, 0)' || $(".thousand").css('background-color') == 'rgb(255, 0, 0)' || $(".million").css('background-color') == 'rgb(255, 0, 0)') {
    		// Hide main blackjack screen
	    	$(".intro").remove();
	    	// Show chips
	    	createChips(moneySelection);
	    	// Size the holders
			holderSize("dealer");
			holderSize("player");
			holderSize("better");
			$(".holder-chips").css("height", 775*fraction + "px");
		    $(".holder-chips").css("width", 155*fraction + "px");
		    $(".holder-buttons").css("height", 300*fraction + "px");
		    $(".holder-buttons").css("width", 200*fraction + "px");
		    $(".holder-better").css("height", 300*fraction + "px");
		    // Listen for chips clicked to place bet
		    $(".holder-better h2").text("Click on chips to place bet");
		    betListener();
		    /*
	        // Alternate between player and dealer cards
	        createCards("player",1);
	        createCards("dealer",1);
	        createCards("player",1);
	        createCards("dealer",1);
	        // Create hit and stand buttons after cards are dealt
	        window.setTimeout(function () {
		        createButtons("hit","Hit");
	        	createButtons("stand","Stand");
		    }, 2000); */
    	} else {
    		// Show error message
    		$(".intro-error").text("Please select an amount");
	    }
    });

    // Card dealing process

    // Allow player to hit until bust
    $(".wrapper").on("click",".hit",function(){
    	// Create player card
        createCards("player",1);
        // Check if player bust
        if (calScore("player") > 21) {
        	window.setTimeout(function () {
		        $(".holder-better h2").text("Player busts!");
		        roundEnd(cardNumber);
		    }, 500);
        }
    });

    // If player stands, calculate dealers moves
    $(".wrapper").on("click",".stand",function(){
    	roundEnd(cardNumber);
    });

    // Start new round of
    $(".wrapper").on("click",".bet",function(){
    	// Remove words
    	$(".holder-better h2").text("");
    	// Start new round of betting
    	deletecards();
    	// Alternate between player and dealer cards
        createCards("player",1);
        createCards("dealer",1);
        createCards("player",1);
        createCards("dealer",1);
        // Remove bet and add hit and stand
    	removeButtons();
        // Create hit and stand buttons after cards are dealt
        window.setTimeout(function () {
	        createButtons("hit","Hit");
        	createButtons("stand","Stand");
	    }, 2500);
    });
});

// End of play
function roundEnd(lastCard) {
    // Remove hit and stand buttons
    removeButtons();
    // Dealer plays
    dealerplay(lastCard);
    // Find winner
    calWin(lastCard);
    // Create bet button
    createButtons("bet","Bet");
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