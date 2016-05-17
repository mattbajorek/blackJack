$( document ).ready(function() {
    $(".generateHand").click(function(){
    	// Delete cards
        deletecards();
        // Create cards
        createcards(2);
    });
});