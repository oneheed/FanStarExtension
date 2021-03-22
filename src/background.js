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
        'timeup': '\/members\/mypoints',
        'vote': '\/rank\/view\/star',
        'fnsborad': '\/stars\/community'
    },
    taskSettings = [{
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

var check = {
        'updateDate': '',
    },
    numbers = {
        'attendanceNumKR': 0,
        'viewArticlesNumKR': 0,
        'viewArticlesNumJP': 0,
        'viewArticlesNumCN': 0,
        'viewArticlesNumEN': 0,
        'viewArticlesNumVN': 0,
        'sharePostNumKR': 0,
        'fnsBoradNumKR': 0,
    },
    events = {
        'clearTaskEvent': () => {
            numbers.attendanceNumKR = 0;
            numbers.viewArticlesNumKR = 0;
            numbers.viewArticlesNumJP = 0;
            numbers.viewArticlesNumCN = 0;
            numbers.viewArticlesNumEN = 0;
            numbers.viewArticlesNumVN = 0;
            numbers.sharePostNumKR = 0;
            numbers.fnsBoradNumKR = 0;
        },
        'checkEvent': (callback) => {
            //tasks.checkAccount();
            tasks.execTask(taskPath.dailypoint, tasks.checkTask, ['KR', 'JP', 'CN', 'EN', 'VN'], callback);
        },
        'attendanceEvent': () => {
            tasks.execTask(taskPath.attendance, tasks.attendanceTask, ['KR']);
        },
        'viewArticlesEvent': (execTaskNames) => {
            tasks.execTask(taskPath.viewArticles, tasks.viewArticlesTask, execTaskNames);
        },
        'sharePostEvent': () => {
            tasks.execTask(taskPath.sharePost, tasks.sharePostTask, ['KR']);
        },
        'timeupEvent': (callback) => {
            tasks.execTask(taskPath.timeup, tasks.timeupTask, ['CN'], callback);
        },
        'voteEvent': () => {
            tasks.execTask(taskPath.vote, tasks.voteTask, ['CN']);
        },
        'fnsboradEvent': () => {
            tasks.execTask(taskPath.fnsborad, tasks.fnsboradTask, ['KR']);
        }
    },
    tasks = {
        'execTask': (taskPath, taskFun, execTaskNames = [], callback = null) => {
            methods.queryTabs(tabs => {
                //console.log(tabs);

                taskSettings.forEach(taskSetting => {
                    let re = new RegExp(methods.getRegex(taskSetting.title, taskPath));
                    //console.log(re.source); // Check regex rule

                    var index = tabs.findIndex(tab => re.exec(tab.url));
                    if (index === -1 && (execTaskNames.length === 0 || execTaskNames.includes(taskSetting.name))) {
                        chrome.tabs.create({
                            url: methods.getTaskUrl(taskSetting.title, taskPath)
                        }, function (createTab) {
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
        'checkAccount': (taskSetting, tabId) => {},
        'checkTask': (taskSetting, tabId, callback) => {
            if (taskSetting.name === 'KR') {
                methods.getTaskNum(tabId, `attendanceNum${taskSetting.name}`, 0, callback);
                //methods.getTaskNum(tabId, `sharePostNum${taskSetting.name}`, 2, callback); // 停用
                methods.getTaskNum(tabId, `fnsBoradNum${taskSetting.name}`, 2, callback);
            }

            methods.getTaskNum(tabId, `viewArticlesNum${taskSetting.name}`, 1, callback);

            //console.log(tasks); // Tasks num
        },
        'attendanceTask': (taskSetting, tabId) => {
            chrome.tabs.executeScript(tabId, {
                file: 'taskAttendance.js'
            });
        },
        'viewArticlesTask': (taskSetting, tabId) => {
            chrome.tabs.executeScript(tabId, {
                code: `document.getElementsByClassName('newsImg')[0].getElementsByTagName('a')[0].href`
            }, result => {
                //console.log(result[0]); // new url
                chrome.tabs.create({
                    url: result[0]
                }, function (createTab) {
                    //console.log(createTab.id); // Create Tab
                    if (taskSetting.name === 'KR') {
                        chrome.tabs.executeScript(createTab.id, {
                            file: 'taskViewArticlesKR.js'
                        });
                    } else {
                        chrome.tabs.executeScript(createTab.id, {
                            file: 'taskViewArticlesOther.js'
                        });
                    }
                });

                chrome.tabs.remove(tabId);
            });
        },
        'sharePostTask': (taskSetting, tabId) => {
            chrome.tabs.executeScript(tabId, {
                file: 'taskSharePos.js'
            });
        },
        'timeupTask': (taskSetting, tabId, callback) => {
            var timeup = callback();
            chrome.tabs.executeScript(tabId, {
                code: `var script = document.createElement('script');
                        script.textContent = \`var timeup = '${timeup}';\`;
                        (document.head || document.documentElement).appendChild(script);`
            }, result => {
                chrome.tabs.executeScript(tabId, {
                    file: 'taskTimeup.js'
                });
            });
        },
        'voteTask': (taskSetting, tabId) => {
            chrome.tabs.executeScript(tabId, {
                file: 'taskVote.js'
            });
        },
        'fnsboradTask': (taskSetting, tabId) => {
            chrome.tabs.executeScript(tabId, {
                file: 'taskFnsborad.js'
            });
        }
    },
    methods = {
        'queryTabs': (callback) => {
            chrome.tabs.query({
                url: queryUrls
            }, callback);
        },
        'getTaskNum': (tabId, valueName, index, callback) => {
            chrome.tabs.executeScript(tabId, {
                code: `parseInt(document.getElementsByClassName('tdstar_mission_tb')[${index}].getElementsByClassName('mission_num')[0].innerText.split(' / ')[0])`
            }, number => {
                numbers[valueName] = number[0];
                check['updateDate'] = methods.getDate();

                // Render veiw
                if (callback != null)
                    callback();

                //console.log(number); //Task Num
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