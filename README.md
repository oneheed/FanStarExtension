# Fan n star Extension

### 介紹

[FAN N STAR](https://fannstar.tf.co.kr/), 加速每日收集星星跟積分

![FAN N STAR Options Page](https://raw.githubusercontent.com/oneheed/FanStarExtension/master/src/images/Fan%20n%20star%20Page.png)

### 如和使用


### 參考 : 
1. [x-forwarded-for](https://github.com/MisterPhilip/x-forwarded-for) 偽裝IP
2. [Extension inject method](https://stackoverflow.com/questions/9515704/use-a-content-script-to-access-the-page-context-variables-and-functions?answertab=active#tab-top) 呼叫Page上的 functions

### 經驗:
1. 如果執行Create是在Popup Page, 會因為開啟新頁面時把Page關閉造成後續程式也被關閉.
```javascript=16
chrome.tabs.create({ url: url }, function(createTab) {
    chrome.tabs.executeScript(createTab.id, { code: 'do something code' });
});
```

2. Inject method 不能執行調用頁面上的參數跟方法需要某些方式, 可參考[這裡](#參考).
3. manifest.json permissions(權限), 要設定好不然會造成不必要錯誤.