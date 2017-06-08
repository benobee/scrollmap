******************************************** 
# SCROLLMAP

**Description**

A module for testing if a DOM element is visible in the viewport, then triggers callbacks on execution. 

********************************************

Using ES6:

	import Scrollmap from 'scrollmap';

Using a CDN via jsDelivr:

	<script src="https://cdn.jsdelivr.net/npm/scrollmap@1.4.7/dist/scrollmap.min.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/scrollmap@1.4.7/dist/scrollmap.js"></script>

********************************************

##Method - trigger(options, callback)

**Arguments**

**target (string or element)**:
Using querySelectorAll a target string selector is needed, or you can specify an actual element.

**surfaceVisible (number)**: the percentage area, which is represented as a number from 0 - 1 is the area of the 
element which is visible in the viewport. 

**runOnScroll (boolean)** : by default the callback is run only one time whent the element is visible. By changing to true, the callback will be run 
as long as the scroll event is happening.

**alwaysRunOnTrigger (boolean)**: by default the triggered element callback will only be executed one time. Setting to true will re-trigger the callback everytime the element has been in and out of the viewport. 

**callback (object)**:
This is the function which will be exectued when the element is detected in the viewport. To reference the node, pass it
into the callback as an argument.

**EXAMPLE**

	Scrollmap.trigger({
		target: '.collection-list .items',
		surfaceVisible: 0.5,
		runOnScroll: true,
		alwaysRunOnTrigger: true
	}, (element) => {
		$(element).addClass("visible");
	});
	
********************************************

##Method - sequence(options, callback)

**Description**
A method for staggering an array of triggers. 

**Arguments**

**options** (object):

properties:

interval: (number) :
changes the interval speed of the sequence

order: (string) :
changes the order of the sequence. Order options are "random", and "reverse".

**EXAMPLE**
		
	Scrollmap.trigger({
		target: ".boxes",
		surfaceVisible: 0.2
	}, (element) => {

		//define the array of the elements to sequence

		const array = element.querySelectorAll(".box");

		//use the sequence method to define, interval and callback
		//function.

		Scrollmap.sequence(array, {
			interval: 5,
			order: "random"
		}, (item) => {

			//add any code to be triggered when
			//the element is in the viewport

			item.classList.add("color-change");

		});
	});

********************************************

##Method - out(function)

When the trigger is has been executed and the element is no longer in the viewport, the out method
can be chained to the trigger to execute the specified function.

**EXAMPLE**

	Scrollmap.trigger({
		target: ".boxes",
		surfaceVisible: 0.2
	}, (element) => {
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

**data-scrollmap-triggered-out (boolean):**
After element detection is in and out of the viewport, a boolean will be set to true. False is set as default.
