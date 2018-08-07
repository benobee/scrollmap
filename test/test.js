import Scrollmap from "../src/scrollmap";

(() => {
  const App = {
    init () {
      Scrollmap.trigger({
        target: ".boxes",
        surfaceVisible: 0.5,
        expandSurfaceArea: "50px"
      }, () => {
        console.log("triggered");
      });
    }
  };

  document.addEventListener("DOMContentLoaded", () => {
    App.init();
  });

})();



