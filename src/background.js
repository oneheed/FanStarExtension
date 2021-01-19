function test() {

    chrome.tabs.create({url: "https://cn.fannstar.tf.co.kr/mission/dailypoint"}, tab => {
        //el.bkg.console.log(tab);
        //el.bkg.console.log('Value Got! Value is');
        chrome.storage.sync.get('test', function(data){
            console.log("Value Got! Value is " + data.test)
        });

        console.log('Value Got! Value is');
        // chrome.tabs.executeScript(null, { file: 'test.js' }, result => {
        //     el.bkg.console.log(result);
        // });
    });
}