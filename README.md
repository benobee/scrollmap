******************************************** 
# SCROLL MAP

**Description**

A module for testing if a DOM element is visible in the viewport, then triggers callbacks on execution.

********************************************

Using ES6: 

	import Scrollmap from 'scrollmap';

Using a CDN via jsDelivr:

	<script src="https://cdn.jsdelivr.net/npm/scrollmap@1.2.6/dist/scrollmap.min.js"></script>

********************************************

** Scrollmap.add(target, options) **

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
	
********************************************

** Scrollmap.sequence(target, options, callback) **

	Scrollmap.add(".boxes", {
	  onTriggerIn() {
	      const array = this.element.querySelectorAll(".box");

	      Scrollmap.sequence(array, {interval: 100}, (item) => {
	          item.classList.add("color-change");
	      });
	  },
	  surfaceVisible: 0.2
	});