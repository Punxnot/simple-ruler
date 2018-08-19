chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({backgroundLayerColor: 'rgba(43, 171, 23, 0.3)', selectionColor: 'rgba(43, 171, 23, 1)'}, function() {
    console.log("The background color is green. The Selection color is green.");
  });
});

chrome.browserAction.onClicked.addListener(function (tab) {
	// For the current tab, inject the "inject.js" file & execute it
	chrome.tabs.executeScript(tab.ib, {
		file: 'inject.js'
	});
});
