import Trigger from "./trigger";

/**
 * @namespace scrollMap
 * @description store element points and check if
 * elements are visible
 */

class Scroll_Event_Trigger {
    constructor () {
        this.lastScrollTop = 0;
        this.points = [];
        this.events();
    }

    out (args) {
        this.onTriggerOut = args;
        return this;
    }

    sequence (array, options, func) {

        /*
         * @desc run through an array of elements and apply a
         * staggered sequence delay
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
         * @desc randomize an array for a trigger sequence
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

    trigger (args, callback) {

        /*
         * @desc add classname indicating element is intialized
        */

        let el = args.target;

        switch (typeof el) {
            case "string":
                el = document.querySelectorAll(el);
                break;
            case "object":
                el = [el];
                break;
            default:
                el = document.querySelectorAll(el);
        }

        el = this.toArray(el);

        el.forEach((node) => {
            node.setAttribute("data-scrollmap-loaded", true);
            node.setAttribute("data-scrollmap-triggered-in", false);
            node.setAttribute("data-scrollmap-triggered-out", false);
            const point = new Trigger(node, args, callback);

            this.points.push(point);
        });
        return this;
    }

    toArray (collection) {
        return Array.prototype.slice.call(collection);
    }

    setTriggerIn (point) {
        point.element.setAttribute("data-scrollmap-is-visible", true);
        point.element.setAttribute("data-scrollmap-triggered-in", true);

        if (!point.triggeredIn) {
            point.onTriggerIn();
            if (point.runOnScroll === false) {
                point.triggeredIn = true;
            }
        }
    }

    setTriggerOut (point) {
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

    elementInViewport (el, percetageOfElement, treshold) {

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
            top: rect.top - window.innerHeight + treshold,
            bottom: rect.bottom + rect.height,
            height: rect.height
        };

        const amount = stats.height * percetageOfElement;

        if ((stats.bottom - amount > stats.height) && (stats.top + amount < 0)) {
            return true;
        }
        return false;
    }

    checkVisible (point) {
        const viewport = this.elementInViewport(point.element, point.surfaceVisible, point.treshold);

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
        let supportsPassive = false;

        try {
            const opts = Object.defineProperty({}, "passive", {
                get () {
                    supportsPassive = true;
                }
            });

            window.addEventListener("test", null, opts);
        } catch (e) {} // eslint-disable-line no-empty

        // initial check on page load to see if elements are visible
        window.addEventListener("load", () => {
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
        }, supportsPassive ? { passive: true } : false);
    }
}

const Scrollmap = new Scroll_Event_Trigger();

window.Scrollmap = Scrollmap;

export default Scrollmap;
