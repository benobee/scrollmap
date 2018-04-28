import Scrollmap from "../src/scrollmap";

(() => {
  const App = {
      init () {
        Scrollmap.trigger({
          target: ".boxes",
          surfaceVisible: 0.5,
          alwaysRunOnTrigger: true,
          expandSurfaceArea: "50px"
          }, (el) => {
              console.log(el)
          })
          .out(() => {
              console.log("out")
          });
      }
  };

  document.addEventListener("DOMContentLoaded", function() {
    App.init();
  });

})();



