import Trigger from "./trigger";
import Transition from "./transition";

  /**
   * @namespace ScrollMap
   * @description: A module for testing if a DOM element is visible in the viewport, then triggers callbacks on execution. 
  */

class Scroll_Event_Trigger {
    constructor () {
        this.lastScrollTop = 0;
        this.points = [];
        this.events();

        console.log(this);
    }
    out (args) {

      /*
        @desc: When the trigger is has been executed and the element is no longer in the viewport, the out method
        can be chained to the trigger to execute the specified function.
      */
    
        this.onTriggerOut = args;
        return this;
    }
    sequence (array, options, func) {

      /*
        @desc: A method for staggering an array of triggers. 

        Properties for options config object:**

        interval: (number) :
        changes the interval speed of the sequence

        order: (string) :
        changes the order of the sequence. Order options are "random", and "reverse".

        callback (item, index):
        can get the item and index of the array as arguments
      */
     
      array = Array.prototype.slice.call(array);

      let delay = 0;

      if (options.order) {
          this.sequenceOrder(array, options.order);
      }

      if (options.delay) {
          delay = options.delay;
      }

      const run = array.forEach((item, i) => {
          setTimeout(() => {
              func(array[ i ], i);
          }, options.interval * i);
      });

      setTimeout(run, delay);

      return this;
    }
    sequenceOrder (array, order) {

      /*
        @desc: sequence options
      */
     
      switch (order) {
          case "random" :
            array = array.sort(() => {
              return 0.5 - Math.random();
            });
            break;
          case "reverse" :
            array = array.reverse();
            break;
          default :

      }
      return array;
    }
    transition (type, options) {

      /*
        @desc: a method for creating an amiated transition
        type (string) : the transition name
        options (object) : options for speed, delay, callbacks etc.
      */
     
      const transition = new Transition({ type }, { options });

      return this;
    }
    trigger (args, callback) {

      /*
        @desc: A method for adding triggers when element is visible in the viewport. 

        Properties for options config object:
        target (string or element): Using querySelectorAll a target string selector 
        is needed, or you can specify an actual element.

        surfaceVisible (number): the percentage area, which is represented as a 
        number from 0 - 1 is the area of the which is visible in the viewport.

        runOnScroll (boolean) : by default the callback is run only one time whent 
        the element is visible. By changing to true, the callback will be run 
        as long as the scroll event is happening.

        alwaysRunOnTrigger (boolean): by default the triggered element callback
        will only be executed one time. Setting to true will re-trigger thcallback 
        everytime the element has been in and out of the viewport.

        callback (object):
        This is the function which will be exectued when the element is detected
        in the viewport. To reference the node, pass it into the callback as an argument.
      */
     
      //handle DOM or string selector
      let el = args.target;

      const triggerElementSelector = args.triggerElement;

      if (args.triggerElement) {
        args.triggerElement = this.checkSelector(args.triggerElement);
      } 

      el = this.checkSelector(el);

      function _id(i) {
        return '_' + (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)) + '_' + i;
      }

      const id = _id();

      el.forEach((node, i) => {
          node.setAttribute("data-scrollmap-id", _id(i) );
          args.triggerElement ? node.setAttribute("data-scrollmap-trigger-element", triggerElementSelector) : false;
          args.transition ? node.setAttribute("data-scrollmap-transition", args.transition) : false;
          node.setAttribute("data-scrollmap-loaded", true);
          node.setAttribute("data-scrollmap-triggered-in", false);
          node.setAttribute("data-scrollmap-triggered-out", false);
          const point = new Trigger(node, args, callback);

          this.points.push(point);
      });
      return this;
    }
    checkSelector(target) {
      switch (typeof target) {
          case "string":
              target = this.toArray(document.querySelectorAll(target));
              break;
          case "object":
              target = [target];
              break;
          default:
              target = this.toArray(document.querySelectorAll(target));
      }

      return target;        
    }
    toArray (collection) {

      /*
        @desc: create a true array from collection of elements
      */
     
        return Array.prototype.slice.call(collection);
    }
    setTriggerIn (point) {

      /*
        @desc: sets points with data hooks and runs callback method  
      */

      point.element.setAttribute("data-scrollmap-is-visible", true);
      point.element.setAttribute("data-scrollmap-triggered-in", true);

      if (!point.triggeredIn) {
          if (point.callback) {
              point.onTriggerIn();             
          }
          if (point.runOnScroll === false) {
              point.triggeredIn = true;
          }
      }
    }
    setTriggerOut (point) {

      /*
        @desc: sets points with data hooks
      */
     
      point.element.setAttribute("data-scrollmap-is-visible", false);
      point.element.setAttribute("data-scrollmap-triggered-out", true);
      if (point.alwaysRunOnTrigger === true) {
          point.triggeredIn = false;
          point.element.setAttribute("data-scrollmap-triggered-in", false);
      }
      if (this.onTriggerOut && !point.triggeredOut && point.triggeredIn) {
          this.onTriggerOut(point);
          point.triggeredOut = true;
      }
    }
    elementInViewport (el, percetageOfElement) {

      /*
       * @desc check if element is in viewport
      */

      /*
       * look for direction of scroll and base element visible
       * percentage off of either top bottom when scrolling
       * down, or the top when scrolling up. This may not be
       * the perfect method but is cross browser compatible.
      */

      const rect = el.getBoundingClientRect();

      const stats = {
          top: rect.top - window.innerHeight,
          bottom: rect.bottom + rect.height,
          height: rect.height
      };

      const amount = stats.height * percetageOfElement;

      if ( (stats.bottom - amount > stats.height) && (stats.top + amount < 0)) {
          return true;
      }
      return false;
    }
    checkVisible (point) {
      const viewport = this.elementInViewport(point.element, point.surfaceVisible);

      if (viewport) {
          this.setTriggerIn(point);
      } else {
          this.setTriggerOut(point);
      }
    }
    on (string, callback) {

      /*
       * methods for creating various listeners
      */
     
      const direction = this.scrollOrient;

      if (direction === "Up" && string === "scrollUp") {
          callback();
      }
      if (direction === "Down" && string === "scrollDown") {
          callback();
      }
      return this;
    }
    scrollDirection () {

      /*
       * return the scroll direction via a string value
      */
     
      let direction = "";
      const st = window.pageYOffset || document.documentElement.scrollTop;

      if (st > this.lastScrollTop) {
           direction = "Down";
      } else {
           direction = "Up";
      }
      this.lastScrollTop = st;
      return direction;
    }
    events () {

      // initial check on page load to see if elements are visible

      window.addEventListener('load', () => {
        this.points.forEach((point) => {
          this.checkVisible(point);
        });
      }, false);

      // check for visible elements on scroll

      window.addEventListener("scroll", () => {
        this.scrollOrient = this.scrollDirection();
        this.points.forEach((point) => {
          this.checkVisible(point);
        });
      });
    }
};

const Scrollmap = new Scroll_Event_Trigger();

window.Scrollmap = Scrollmap;

export default Scrollmap;