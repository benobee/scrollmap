import Scrollmap from "../dist/scrollmap";

console.log(Scrollmap);

(() => {
  const App = {
      init () {
        this.renderBoxes();
        this.scrollmap();
      },
      renderBoxes () {
        const target = document.querySelector(".boxes");

        const array = Array(1080).fill(0);

        array.forEach(() => {
          const div = document.createElement("div");

          div.innerHTML = "<div class='box'></div>";
          target.appendChild(div);
        });
      },
      scrollmap () {
        Scrollmap.trigger({ target: ".boxes", surfaceVisible: 0.3 }, (element) => {
              //define the array of the elements to sequence

              const array = Array.prototype.slice.call(element.querySelectorAll(".box"));

              //use the sequence method to define, interval and callback
              //function.

              Scrollmap.sequence(array, { interval: 350, order: "random" }, (item, i) => {

              //add any code to be triggered when
              //the element is in the viewport
              const style = {
                animation: `spin 2.1" ${ i * 3 } "s ease-in-out alternate infinite`
              };

              if ((i % 2) === 0) {
                item.setAttribute("style", JSON.stringify(style).replace(/,/g, ";").replace(/{/g, "").replace(/}/g, "").replace(/"/g, ""));
                item.classList.add("color-change");
              }
              if ((i % 7) === 0) {
                item.classList.add("fly");
              }
            });
        });
      }
  };

  App.init();

})();



