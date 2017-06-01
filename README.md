******************************************** 
# SCROLLMAP

**Description**

A module for testing if a DOM element is visible in the viewport, then triggers callbacks on execution. 

********************************************

Using ES6:

	import Scrollmap from 'scrollmap';

Using a CDN via jsDelivr:

	<script src="https://cdn.jsdelivr.net/npm/scrollmap@1.4.0/dist/scrollmap.min.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/scrollmap@1.4.0/dist/scrollmap.js"></script>

********************************************

##Method (trigger)

**Arguments**

**target (string or element)**:
Using querySelectorAll a target string selector is needed, or you can specify an actual element.

**options (object)**: 

  **surfaceVisible (number)**: the percentage area, which is represented as a number from 0 - 1 is the area of the 
  element which is visible in the viewport. 

  **runOnScroll (boolean)** : by default the callback is run only one time. By changing to true, the callback will be run as long as the scroll event is happening.

  **alwaysRunOnTrigger (boolean)**: by default the trigger callback will be executed only one time per being visible in the viewport. 

**callback (object)**:
This is the function which will be exectued when the element is detected in the viewport. To reference the node, pass it
into the callback as an argument.

**EXAMPLE**

	Scrollmap.trigger('.collection-list .items', {surfaceVisible: 0.5, runOnScroll: true, alwaysRunOnTrigger: true}, (element) => {
	    $(element).addClass("visible");
	});
	
********************************************

##Method (sequence)

**EXAMPLE**
		
	Scrollmap.trigger(".boxes", { surfaceVisible: 0.2 }, (element) => {

	    //define the array of the elements to sequence

	    const array = element.querySelectorAll(".box");
	      
	    //use the sequence method to define, interval and callback
	    //function.

	    Scrollmap.sequence(array, {interval: 5}, (item) => {

		  //add any code to be triggered when
		  //the element is in the viewport

	      item.classList.add("color-change");

	  	});
	});

********************************************

##Method (out)

When the trigger is has been executed and element is no longer in the viewport the out method
can be chained to the trigger to execute the specified function.

**EXAMPLE**

	Scrollmap.trigger(".boxes", {surfaceVisible: 0.2}, (element) => {
		element.classList.add("foo");
	}).out((element) => {
		element.classList.add("bar");
	});

********************************************

##Hooks

**data-scrollmap-loaded (boolean):**
Once the element is initialized.

**data-scrollmap-is-visible (boolean):**
If element is visible is viewport, the value will be set to true. When the elemnt is out of the viewport
the value will be false.

**data-scrollmap-triggered-in (boolean):**
After element detection in viewport, a boolean will be set to true. False is set as default.
