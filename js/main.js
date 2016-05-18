$( document ).ready(function() {
	// Size the holders
	holderSize("dealer");
	holderSize("player");
    // Button clicks
    $(".generateHand").on("click",function(){
    	// Delete cards
        deletecards();
        // Create dealer cards
        createCards("dealer",2);
        // Create player cards
        createCards("player",2);
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