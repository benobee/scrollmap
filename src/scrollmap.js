import Trigger from './trigger';

/**
 *
 * @namespace scrollMap
 * @description store element points and check if
 * elements are visible
 *
*/ 

class Scroll_Event_Trigger {
  constructor() {
    this.lastScrollTop = 0;
    this.points = [];
    this.events();
  }
  sequence(array, options, func) {

    /* 
     * @desc run through an array of elements and apply a 
     * staggered sequence delay
    */
   
    array.forEach((item, i) => {
      setTimeout(() => {
        func(array[ i ]);
      }, options.interval * i);
    });

    return this;
  }
  add(el, callback) {

    /* 
     * @desc add classname indicating element is intialized
    */
   
    const type = (typeof el);

    if (type === "string") {
        el = document.querySelectorAll(el);
    } else if ( type === "object" ) {
        el = [el];
    }

    el.forEach((node) => {
        node.setAttribute(`data-scrollmap-loaded`, true);

        const point = new Trigger(node, callback);

        this.points.push(point);
    });

    return this;
  }
  remove(trigger) {

      trigger = null;

      return this;   
  }
  elementInViewport(el, percetageOfElement) {

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
  checkVisible(point) {
    const targetElement = point.element;

    const viewport = this.elementInViewport(targetElement, point.surfaceVisible);

    if (viewport) {
      targetElement.setAttribute(`data-is-visible`, true);

      if (point.onTriggerIn) {
          point.onTriggerIn();
      }

    } else {
      targetElement.setAttribute(`data-is-visible`, false);

      if (point.onTriggerOut) {
          point.onTriggerOut();
      }
    }
  }
  on(string, callback) {

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
  scrollDirection() {

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
  extend(obj) {

    Object.assign(this, obj);

  }
  events() {

    //initial check on page load to see if elements are visible
    window.onload = () => {
      this.points.forEach((point) => {
        this.checkVisible(point);
      });
    };

    //check for visible elements on scroll
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