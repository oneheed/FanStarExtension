let queryUrls = [
    '*://fannstar.tf.co.kr/*',
    '*://jp.fannstar.tf.co.kr/*',
    '*://cn.fannstar.tf.co.kr/*',
    '*://en.fannstar.tf.co.kr/*',
    '*://vn.fannstar.tf.co.kr/*'
],
taskPath = {
    'dailypoint': '\/mission\/dailypoint',
    'attendance': '\/mission\/check',
    'viewArticles': '\/mission\/news',
    'sharePost': '\/stars\/best',
},
taskSettings = [
    {
        'name': 'KR',
        'title': '',
    },
    {
        'name': 'JP',
        'title': 'jp',
    },
    {
        'name': 'CN',
        'title': 'cn',
    },
    {
        'name': 'EN',
        'title': 'en',
    },
    {
        'name': 'VN',
        'title': 'vn',
    }
]

var tasks = {
    'attendanceNumKR': 0,
    'viewArticlesNumKR': 0,
    'viewArticlesNumJP': 0,
    'viewArticlesNumCN': 0,
    'viewArticlesNumEN': 0,
    'viewArticlesNumVN': 0,
    'sharePostNumKR': 0,
},
methods = {
    'checkEvent': () => {
        methods.checkAccount();
        methods.execTask(taskPath.dailypoint, methods.checkTask);
    },
    'attendanceEvent': () => {
        methods.execTask(taskPath.attendance, methods.attendanceTask, ['KR']);
    },
    'viewArticlesEvent': () => {
        methods.execTask(taskPath.viewArticles, methods.viewArticlesTask);
    },
    'sharePosEvent': () => {
        methods.execTask(taskPath.sharePost, methods.sharePosTask, ['KR']);
    },
    'execTask': (taskPath, taskFun, execTaskNames=[]) => {
        methods.queryTabs(tabs => {
            //console.log(tabs);

            taskSettings.forEach(taskSetting => { 
                let re = new RegExp(methods.getRegex(taskSetting.title, taskPath));
                //console.log(re.source); // Check regex rule

                var index = tabs.findIndex(tab => re.exec(tab.url));
                if(index === -1 && (execTaskNames.length === 0 || execTaskNames.includes(taskSetting.name))) {
                    chrome.tabs.create({ url: methods.getTaskUrl(taskSetting.title, taskPath) }, function(createTab) {
                        //console.log(createTab.id); // Create Tab
                        taskFun(taskSetting, createTab.id);
                    });
                } else if (execTaskNames.length === 0 || execTaskNames.includes(taskSetting.name)) {
                    //console.log(tabs[index].id); // Create Tab
                    taskFun(taskSetting, tabs[index].id);
                }
            });
        }); 
    },
    'checkAccount': (taskSetting, tabId) => {  
    },
    'checkTask': (taskSetting, tabId) => {
        if(taskSetting.name === 'KR') {
            methods.getTaskNum(tabId, `attendanceNum${taskSetting.name}`, 0);
            methods.getTaskNum(tabId, `sharePostNum${taskSetting.name}`, 2);
        }
        
        methods.getTaskNum(tabId, `viewArticlesNum${taskSetting.name}`, 1);
        
        //console.log(tasks); // Tasks num
    },
    'attendanceTask': (taskSetting, tabId) => {
        chrome.tabs.executeScript(tabId, { file: 'attendanceTask.js' });
    },
    'viewArticlesTask': (taskSetting, tabId) => {
        //chrome.tabs.executeScript(tabId, { file: 'viewArticles.js' });
    },
    'sharePosTask': (taskSetting, tabId) => {
        chrome.tabs.executeScript(tabId, { file: 'sharePosTask.js' });
    },
    'queryTabs': (callback) => {
        chrome.tabs.query({ url: queryUrls }, callback);
    },
    'getTaskNum': (tabId, valueName, index) => {
        chrome.tabs.executeScript(tabId, { code: `parseInt(document.getElementsByClassName('tdstar_mission_tb')[${index}].getElementsByClassName('mission_num')[0].innerText.split(' / ')[0])` }, result => {
            tasks[valueName] = result[0];

            console.log(result);
            //methods.RenderNum();
        });
    },
    'getRegex': (title, path) => {
        return '\/\/' + title + '(|\.)fannstar\.tf\.co\.kr' + path;
    },
    'getTaskUrl': (title, path) => {
        return 'https://' + title + '.fannstar.tf.co.kr' + path;
    }
}