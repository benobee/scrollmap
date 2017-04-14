******************************************** 
# SCROLL MAP

**Description**

A module for testing if the element is visible on the current viewport. Trigger callbacks are provided, as well as a configuration for surface trigger area. (0.5 = 50%) - more docs coming soon.

********************************************

EXAMPLE

	import Scrollmap from "/scrollmap";

	Scrollmap.add('.collection-list .items', {
	    onTriggerIn() {
	        $(this.element).addClass("visible");
	    },
	    onTriggerOut() {
	    	$(this.element).removeClass("visible");
	    },
	    surfaceVisible: 0.5
	});


"# scrollmap" 
"# scrollmap" 
