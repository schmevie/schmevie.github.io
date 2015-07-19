$(document).ready(function() {


	//EVENTS
	$(".headshot-frame").on("mouseover", function() {
		console.log("evie is here");
	});
	// convert all a/href to a#href
	$("body").delegate("a", "click", function(){
		var href = $(this).attr("href"); // modify the selector here to change the scope of intercpetion
		
		 // Push this URL "state" onto the history hash.
		$.bbq.pushState(href,2);
 
		// Prevent the default click behavior.
		return false;
	});
	// Bind a callback that executes when document.location.hash changes.
	$(window).bind( "hashchange", function(e) {
		var url = Object.extended($.bbq.getState()).keys();
		
		if (url.length==1){
			url = url[0];
		} else {
			return;
		}

	    switch(url) {
	    	case "/headshots":
	    	var columnLeftWidth = $(".column-left").width();
	    	$(".column-left").css("width", "450px");
	    	$(".column-left").css("position", "absolute");
	    	TweenMax.to($(".column-left"), 1, {left: "-20em", delay:"0"});

	    	$(".column-right").css("width", "450px");
	    	$(".column-right").css("position", "absolute");
	    	TweenMax.to($(".column-right"), 1, {right: "-20em", delay:"0"});
	    	console.log("headshot");
	    	break;

	    	case "/resume":
	    	console.log("resume");

	    	case "/reel":
	    	console.log("reel");

	    	case "/about":
	    	console.log("about");

	    	default:
		    	$(".column-left").css("width", "33%");
		    	$(".column-left").css("position", "relative");
		    	$(".column-left").css("left", "0");

		    	$(".column-right").css("width", "33%");
		    	$(".column-right").css("position", "relative");
		    	$(".column-right").css("right", "0");
	    }



	});
	if (window.location.hash=='') {
		window.location.hash="/"; // home page, show the default view (user list)
	} else {
		$(window).trigger( "hashchange" ); // user refreshed the browser, fire the appropriate function
	}
});