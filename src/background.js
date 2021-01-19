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
    'vote': '\/rank\/view\/star',
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
    'updateDate': '',
},
methods = {
    'clearTaskEvent': () => {
        tasks.attendanceNumKR = 0;
        tasks.viewArticlesNumKR = 0;
        tasks.viewArticlesNumJP = 0;
        tasks.viewArticlesNumCN = 0;
        tasks.viewArticlesNumEN = 0;
        tasks.viewArticlesNumVN = 0;
        tasks.sharePostNumKR = 0;
    },
    'checkEvent': (callback) => {
        //methods.checkAccount();
        methods.execTask(taskPath.dailypoint, methods.checkTask, ['KR', 'JP', 'CN', 'EN', 'VN'], callback);
    },
    'attendanceEvent': () => {
        methods.execTask(taskPath.attendance, methods.attendanceTask, ['KR']);
    },
    'viewArticlesEvent': (execTaskNames) => {
        methods.execTask(taskPath.viewArticles, methods.viewArticlesTask, execTaskNames);
    },
    'sharePostEvent': () => {
        methods.execTask(taskPath.sharePost, methods.sharePostTask, ['KR']);
    },
    'voteEvent': () => {
        methods.execTask(taskPath.vote, methods.voteTask, ['CN']);
    },
    'execTask': (taskPath, taskFun, execTaskNames=[], callback=null) => {
        methods.queryTabs(tabs => {
            //console.log(tabs);

            taskSettings.forEach(taskSetting => { 
                let re = new RegExp(methods.getRegex(taskSetting.title, taskPath));
                //console.log(re.source); // Check regex rule

                var index = tabs.findIndex(tab => re.exec(tab.url));
                if(index === -1 && (execTaskNames.length === 0 || execTaskNames.includes(taskSetting.name))) {
                    chrome.tabs.create({ url: methods.getTaskUrl(taskSetting.title, taskPath) }, function(createTab) {
                        //console.log(createTab.id); // Create Tab
                        taskFun(taskSetting, createTab.id, callback);
                    });
                } else if (execTaskNames.length === 0 || execTaskNames.includes(taskSetting.name)) {
                    //console.log(tabs[index].id); // Create Tab
                    taskFun(taskSetting, tabs[index].id, callback);
                }
            });
        }); 
    },
    'checkAccount': (taskSetting, tabId) => {  
    },
    'checkTask': (taskSetting, tabId, callback) => {
        if(taskSetting.name === 'KR') {
            methods.getTaskNum(tabId, `attendanceNum${taskSetting.name}`, 0, callback);
            methods.getTaskNum(tabId, `sharePostNum${taskSetting.name}`, 2, callback);
        }
        
        methods.getTaskNum(tabId, `viewArticlesNum${taskSetting.name}`, 1, callback);
        
        //console.log(tasks); // Tasks num
    },
    'attendanceTask': (taskSetting, tabId) => {
        chrome.tabs.executeScript(tabId, { file: 'attendanceTask.js' });
    },
    'viewArticlesTask': (taskSetting, tabId) => {
        chrome.tabs.executeScript(tabId, { code: `document.getElementsByClassName('newsImg')[0].getElementsByTagName('a')[0].href` }, result => { 
            //console.log(result[0]); // new url
            chrome.tabs.create({ url: result[0] }, function(createTab) {
                //console.log(createTab.id); // Create Tab
                if(taskSetting.name === 'KR') {
                    chrome.tabs.executeScript(createTab.id, { file: 'viewArticlesKR.js' });
                } else {
                    chrome.tabs.executeScript(createTab.id, { file: 'viewArticlesOther.js' });
                }
            });

            chrome.tabs.remove(tabId);
        });      
    },
    'sharePostTask': (taskSetting, tabId) => {
        chrome.tabs.executeScript(tabId, { file: 'sharePosTask.js' });
    },
    'voteTask': (taskSetting, tabId) => {
        chrome.tabs.executeScript(tabId, { file: 'voteTask.js' });
    },
    'queryTabs': (callback) => {
        chrome.tabs.query({ url: queryUrls }, callback);
    },
    'getTaskNum': (tabId, valueName, index, callback) => {
        chrome.tabs.executeScript(tabId, { code: `parseInt(document.getElementsByClassName('tdstar_mission_tb')[${index}].getElementsByClassName('mission_num')[0].innerText.split(' / ')[0])` }, result => {
            tasks[valueName] = result[0];
            tasks['updateDate'] = methods.getDate();

            // Render veiw
            if(callback != null)
                callback();

            //console.log(result); //Task Num
        });
    },
    'getRegex': (title, path) => {
        return '\/\/' + title + '(|\.)fannstar\.tf\.co\.kr' + path;
    },
    'getTaskUrl': (title, path) => {
        return 'https://' + title + '.fannstar.tf.co.kr' + path;
    },
    'getDate': () => {
        return (new Date())
            .toISOString()
            .replace(
                /^(?<year>\d+)-(?<month>\d+)-(?<day>\d+)T.*$/,
                '$<year>-$<month>-$<day>'
            );
    }
}