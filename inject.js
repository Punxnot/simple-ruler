(function() {
  // Remove if already created
  var oldCanvas = document.getElementById("simpleRulerCanvas");
  if (oldCanvas) {
    oldCanvas.parentNode.removeChild(oldCanvas);
    return;
  }

  // Create semi-transparent layer
  var simpleRulerCanvas = document.createElement('div');
  simpleRulerCanvas.setAttribute("id", "simpleRulerCanvas");
  simpleRulerCanvas.style.position = 'fixed';
  simpleRulerCanvas.style.top = 0;
  simpleRulerCanvas.style.left = 0;
  simpleRulerCanvas.style.height = "100vh";
  simpleRulerCanvas.style.width = "100%";
  simpleRulerCanvas.style.backgroundColor = "rgba(0, 0, 0, 0.3)";
  simpleRulerCanvas.style.zIndex = "1000";

  // Create info container
  var simpleRulerinfoBox = document.createElement('div');
  simpleRulerinfoBox.setAttribute("id", "simpleRulerinfoBox");
  simpleRulerinfoBox.style.position = 'absolute';
  simpleRulerinfoBox.style.background = "#ffffff";

  simpleRulerCanvas.appendChild(simpleRulerinfoBox);
  document.body.appendChild(simpleRulerCanvas);

  initDraw(simpleRulerCanvas);

  function initDraw(simpleRulerCanvas) {
    function setMousePosition(e) {
      var ev = e || window.event;
      if (ev.pageX) {
        mouse.x = ev.pageX + window.pageXOffset;
        mouse.y = ev.pageY + window.pageYOffset;
      } else if (ev.clientX) {
        mouse.x = ev.clientX + document.body.scrollLeft;
        mouse.y = ev.clientY + document.body.scrollTop;
      }
    };

    var mouse = {
      x: 0,
      y: 0,
      startX: 0,
      startY: 0
    };

    var element = null;

    simpleRulerCanvas.onmousemove = function (e) {
      setMousePosition(e);
      if (element !== null) {
        element.style.width = Math.abs(mouse.x - mouse.startX) + 'px';
        element.style.height = Math.abs(mouse.y - mouse.startY) + 'px';
        element.style.left = (mouse.x - mouse.startX < 0) ? mouse.x + 'px' : mouse.startX + 'px';
        element.style.top = (mouse.y - mouse.startY < 0) ? mouse.y + 'px' : mouse.startY + 'px';
      }
    }

    simpleRulerCanvas.onclick = function(e) {
      if (element !== null) {
        // Display size info
        simpleRulerinfoBox.innerHTML = "Width: " + element.style.width + " / Height: " + element.style.height;

        // Position text box depending on the selection position
        simpleRulerinfoBox.style.left = element.style.left;
        var elementTopPosition = parseInt(element.style.top);
        var elementHeight = parseInt(element.style.height);
        var viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        if (elementHeight >= (viewportHeight - 60)) {
          simpleRulerinfoBox.style.top = elementTopPosition + 20 + "px";
        } else if (elementTopPosition >= 60) {
          simpleRulerinfoBox.style.top = elementTopPosition - 20 + "px";
        } else {
          simpleRulerinfoBox.style.top = elementTopPosition + elementHeight + 20 + "px";
        }

        element = null;
        simpleRulerCanvas.style.cursor = "default";
      } else {
        mouse.startX = mouse.x;
        mouse.startY = mouse.y;

        // Remove previous selection
        var oldElement = document.getElementById("selection");
        if (oldElement) {
          oldElement.parentNode.removeChild(oldElement);
          simpleRulerinfoBox.innerHTML = "";
        }

        // Create new selection
        element = document.createElement('div');
        element.className = 'rectangle';
        element.setAttribute("id", "selection");
        element.style.left = mouse.x + 'px';
        element.style.top = mouse.y + 'px';
        element.style.border = "1px solid #FF0000";
        element.style.position = "absolute";

        simpleRulerCanvas.appendChild(element);
        simpleRulerCanvas.style.cursor = "crosshair";
      }
    }
  }
})();
