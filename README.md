******************************************** 
# SCROLL MAP

**Description**

A module for testing if a DOM element is visible in the viewport, then triggers callbacks on execution.

********************************************

Using ES6: 

	import Scrollmap from 'scrollmap';

Using a CDN via jsDelivr:

	<script src="https://cdn.jsdelivr.net/npm/scrollmap@1.2.8/dist/scrollmap.min.js"></script>

********************************************

**Scrollmap.add(target, options)**

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

	   	//the percentage of the visible element in
	   	//the viewport. A value of 1 will wait till
	   	//the element's full size is viewable.

	    surfaceVisible: 0.5
	});
	
********************************************

**Scrollmap.sequence(target, options, callback)**
		
	Scrollmap.add(".boxes", {
	  onTriggerIn() {

	  	  //define the array of the elements to sequence

	      const array = this.element.querySelectorAll(".box");
		  
		  //use the sequence method to define, interval and callback
		  //function.

	      Scrollmap.sequence(array, {interval: 100}, (item) => {

	    	  //add any code to be triggered when
	    	  //the element is in the viewport

	          item.classList.add("color-change");
	      });
	  },

	  //the percentage of the visible element in
	  //the viewport. A value of 1 will wait till
	  //the element's full size is viewable.

	  surfaceVisible: 0.2
	});