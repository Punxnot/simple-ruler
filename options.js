let backgroundButtons = document.getElementById('backgroundButtonDiv');
let selectionButtons = document.getElementById('selectionButtonDiv');

const bButtonColors = ['rgba(43, 171, 23, 0.3)', 'rgba(184, 30, 30, 0.3)', 'rgba(184, 81, 30, 0.3)', 'rgba(39, 98, 176, 0.3)'];
const sButtonColors = ['rgba(43, 171, 23, 1)', 'rgba(184, 30, 30, 1)', 'rgba(184, 81, 30, 1)', 'rgba(39, 98, 176, 1)'];

function constructOptions(arr, name) {
  for (let item of arr) {
    let container = document.createElement('span');
    let input = document.createElement("input");
    input.setAttribute("type", "radio");
    input.setAttribute("name", name);
    let currentId = name + arr.indexOf(item);
    input.setAttribute("id", currentId);
    let label = document.createElement("label");
    label.setAttribute("for", currentId);
    label.style.backgroundColor = item;
    label.addEventListener('click', function(e) {
      if (name == "background") {
        chrome.storage.sync.set({backgroundLayerColor: item});
      } else if (name == "selection") {
        chrome.storage.sync.set({selectionColor: item});
      }
    });
    container.appendChild(input);
    container.appendChild(label);
    if (name == "background") {
      backgroundButtons.appendChild(container);
    } else if (name == "selection") {
      selectionButtons.appendChild(container);
    }
  }
}
constructOptions(bButtonColors, "background");
constructOptions(sButtonColors, "selection");
