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
	    	// Delete cards
	        //deletecards();
	        // Create dealer cards
	        createCards("dealer",2);
	        // Create player cards
	        createCards("player",2);
    	} else {
    		// Show error message
    		$(".intro-error").text("Please select an amount");
	    }
    });

    $(".hitPlayer").on("click",function(){
    	// Create player card
        createCards("player",1);
    });
    $(".hitDealer").on("click",function(){
    	// Create player card
        createCards("dealer",1);
    });
    $(".calPlayerScore").on("click",function(){
    	console.log(calScore("player"));
    });
    $(".calDealerScore").on("click",function(){
    	console.log(calScore("dealer"));
    });

    
});