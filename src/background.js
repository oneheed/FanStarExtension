chrome.runtime.onInstalled.addListener(function() {
    let settings = {
        spoofIp: '123',
        previous: [],
        headers: ['X-Forwarded-For']
    };

    chrome.storage.sync.set(settings, function() {
        console.log('The color is green.');
      });

      chrome.storage.sync.get(settings, function(settings1) {
        console.log(settings1);
      });
});

chrome.browserAction.onClicked.addListener(function(activeTab){
    console.log(activeTab.id);
    //document.getElementsByClassName("_8f1i")[0].click();

    chrome.tabs.executeScript(activeTab.id, {code: `console.log(document.getElementsByClassName('qa-action__link qa-action__link--reply')); 
    document.getElementsByClassName('qa-action__link qa-action__link--reply')[0].click();`});
  });

