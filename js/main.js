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
			holderSize("bet");
			$(".holder-chips").css("height", 775*fraction + "px");
		    $(".holder-chips").css("width", 155*fraction + "px");
		    $(".holder-buttons").css("height", 300*fraction + "px");
		    $(".holder-buttons").css("width", 200*fraction + "px");
		    $(".holder-bet").css("height", 300*fraction + "px");
	        // Create dealer cards
	        createCards("dealer",2);
	        // Create player cards
	        createCards("player",2);
	        // Create hit and stand buttons
	        createButtons("hit","Hit");
	        createButtons("stand","Stand");
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
        	roundEnd();
        }
    });

    // If player stands, calculate dealers moves
    $(".wrapper").on("click",".stand",function(){
    	roundEnd();
    });

    // Start new round of
    $(".wrapper").on("click",".bet",function(){
    	// Remove words
    	$(".holder-bet h2").text("");
    	// Start new round of betting
    	deletecards();
    	// Create dealer cards
        createCards("dealer",2);
        // Create player cards
        createCards("player",2);
        // Remove bet and add hit and stand
    	removeButtons();
        createButtons("hit","Hit");
        createButtons("stand","Stand");
    });
});