$( document ).ready(function() {
    $(".generateHand").on("click",function(){
    	// Delete cards
        deletecards();
        // Create dealer cards
        createcards("dealer",2);
        // Create player cards
        createcards("player",2);
    });
});