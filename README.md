******************************************** 
# SCROLL MAP

**Description**

A module for testing if a DOM element is visible in the viewport.

Trigger callbacks are provided, as well as a configuration for surface trigger area.

********************************************

AS SIMPLE AS 

	import Scrollmap from 'scrollmap';

	Scrollmap.add('.collection-list .items');


(with optional parameters)

	Scrollmap.add('.collection-list .items', {
	    onTriggerIn() {

	    	//add any code to be triggered upon
	    	//the element becoming visible

	        $(this.element).addClass("visible");
	    },
	    onTriggerOut() {

	    	//add any code to be triggered when
	    	//the element is out of the viewport

	    	$(this.element).removeClass("visible");
	    },
	    surfaceVisible: 0.5
	});
"# scrollmap" 
