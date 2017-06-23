import Scrollmap from "../src/scrollmap";

(() => {
  const App = {
      init () {
        this.renderBoxes();
        this.scrollmap();
      },
      renderBoxes () {
        const target = document.querySelector(".boxes");

        const array = Array(30).fill(0);

        array.forEach(() => {
          const div = document.createElement("div");

          div.classList.add("box");

          div.innerHTML = "<div class='content'></div>";
          target.appendChild(div);
        });
      },
      makeShape (element, type) {
        const parentAttributes = {
            height: element.clientHeight,
            width: element.clientWidth
        };

        const childAttributes = {
          height: element.firstChild.offsetHeight,
          width: element.firstChild.offsetWidth
        }

        if (type === "circle") {
            //console.log([element], parentAttributes, childAttributes);

            const firstRowWidth = Math.floor( parentAttributes.width / childAttributes.width );

            const amount = document.querySelectorAll(".boxes .box").length;

            //console.log(firstRowWidth);

            const row = document.querySelectorAll(`.box:nth-child(-n+${firstRowWidth})`);

            row.forEach((item) => {
              item.classList.add("black");
            });
        }
      },
      addStyle (css) {

      },
      scrollmap () {
        Scrollmap.trigger({
          target: ".boxes",
          surfaceVisible: 0.3,
          triggerElement: ".box",
          transition: "fadeIn",
          }, (element) => {

              element.classList.add("added");
              //this.makeShape(element, "circle");
              //define the array of the elements to sequence

              //const array = Array.prototype.slice.call(element.querySelectorAll(".box"));

              //use the sequence method to define, interval and callback
              //function.

            //   Scrollmap.sequence(array, { interval: 50, order: "random" }, (item, i) => {

            //   //add any code to be triggered when
            //   //the element is in the viewport
            //   const style = {
            //     animation: `spin 2.1" ${ i * 3 } "s ease-in-out alternate infinite`
            //   };

            //   if ((i % 2) === 0) {
            //     //item.setAttribute("style", JSON.stringify(style).replace(/,/g, ";").replace(/{/g, "").replace(/}/g, "").replace(/"/g, ""));
            //     item.classList.add("color-change");
            //   }
            //   if ((i % 7) === 0) {
            //     item.classList.add("fly");
            //   }

            // });
        });
      }
  };

  document.addEventListener("DOMContentLoaded", function() {
    App.init();
  });

})();



