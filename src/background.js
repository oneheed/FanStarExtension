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
    //console.log(document.getElementsByClassName("_8f1i"));
    //document.getElementsByClassName("_8f1i")[0].click();

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        // query the active tab, which will be only one tab
        //and inject the script in it
    });

    //chrome.tabs.executeScript(activeTab.id, {code: `console.log(document.getElementsByClassName('inlineBlock _2tga _89n_ _8j9v')); 
    //document.getElementsByClassName('inlineBlock _2tga _89n_ _8j9v')[0].click();`});

    chrome.tabs.query({ url: ['*://en.fannstar.tf.co.kr/*', '*://mail.google.com/*'] }, function(tabs) {
        console.log(tabs);
        let isPage = false;
        let re = /en\.fannstar\.tf\.co\.kr/;
        var test = tabs.some(tab => re.exec(tab.url));
        
        console.log(test);

        // chrome.tabs.create({url: "https://en.fannstar.tf.co.kr"}, function(tab1) {
        //     console.log(tab1);
        // });
        
        // query the active tab, which will be only one tab
        //and inject the script in it
    });

    // chrome.tabs.query({}, function(tabs){         
    //     console.log("\n/////////////////////\n");
    //     tabs.forEach(function(tab){
    //         chrome.windows.get(tab.windowId, function(windows) {
    //             console.log(windows);
    //         });       
    //     });
    //  });
  });

