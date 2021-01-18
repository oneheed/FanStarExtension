(() => {
    let el = {
            'dailypoint': document.getElementById('dailypoint'),

            'attendance': document.getElementById('attendance'),
            'viewArticlesKR': document.getElementById('viewArticlesKR'),
            'viewArticlesJP': document.getElementById('viewArticlesJP'),
            'viewArticlesCN': document.getElementById('viewArticlesCN'),
            'viewArticlesEN': document.getElementById('viewArticlesEN'),
            'viewArticlesVN': document.getElementById('viewArticlesVN'),
            'sharePost': document.getElementById('sharePost'),

            'attendanceNumKR': document.getElementById('attendanceNumKR'),
            'viewArticlesNumKR': document.getElementById('viewArticlesNumKR'),
            'viewArticlesNumJP': document.getElementById('viewArticlesNumJP'),
            'viewArticlesNumCN': document.getElementById('viewArticlesNumCN'),
            'viewArticlesNumEN': document.getElementById('viewArticlesNumEN'),
            'viewArticlesNumVN': document.getElementById('viewArticlesNumVN'),
            'sharePostNumKR': document.getElementById('sharePostNumKR'),

            'bkg': chrome.extension.getBackgroundPage()
        },
        queryUrls = [
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
        tasks = {
            'attendanceNumKR': 0,
            'viewArticlesNumKR': 0,
            'viewArticlesNumJP': 0,
            'viewArticlesNumCN': 0,
            'viewArticlesNumEN': 0,
            'viewArticlesNumVN': 0,
            'sharePostNumKR': 0,
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
        ],
        methods = {
            'checkEvent': () => {
                methods.chekcAccount();
                methods.execTask(taskPath.dailypoint, methods.chekcTask);
            },
            'attendanceEvent': () => {
                chrome.tabs.create({url: "https://www.google.com/"}, function (tab) {
                    var c = "var s = document.createElement('script');\
                        s.textContent = \"alert('test');\";\
                        (document.head||document.documentElement).appendChild(s);"
                    chrome.tabs.executeScript(tab.id, {code: c});
                });
            },
            'viewArticlesEvent': () => {

            },
            'queryTabs': (callback) => {
                chrome.tabs.query({ url: queryUrls }, callback);
            },
            'execTask': (taskPath, taskFun, execTaskNames=[]) => {
                methods.queryTabs(tabs => {
                    //el.bkg.console.log(tabs);
  
                    taskSettings.forEach(taskSetting => { 
                        let re = new RegExp(methods.getRegex(taskSetting.title, taskPath));
                        //el.bkg.console.log(re.source); // Check regex rule
       
                        var index = tabs.findIndex(tab => re.exec(tab.url));
                        if(index === -1 && (execTaskNames.length === 0 || execTaskNames.includes(taskSetting.name))) {
                            chrome.tabs.create({ url: methods.getTaskUrl(taskSetting.title, taskPath) }, function(createTab) {
                                el.bkg.console.log(createTab.id); // Create Tab
                                taskFun(taskSetting, createTab.id);
                            });
                        } else if (execTaskNames.length === 0 || execTaskNames.includes(taskSetting.name)) {
                            el.bkg.console.log(tabs[index].id); // Create Tab
                            taskFun(taskSetting, tabs[index].id);
                        }
                    });
                }); 
            },
            'chekcAccount': (taskSetting, tabId) => {  
            },
            'chekcTask': (taskSetting, tabId) => {
                if(taskSetting.name === 'KR') {
                    methods.getTaskNum(tabId, `attendanceNum${taskSetting.name}`, 0);
                    methods.getTaskNum(tabId, `sharePostNum${taskSetting.name}`, 2);
                }
                
                methods.getTaskNum(tabId, `viewArticlesNum${taskSetting.name}`, 1);
                
                //el.bkg.console.log(tasks); // Tasks num
            },
            'attendanceTask': (taskSetting, tabId) => {
                var code = `$(function() {
                    var reUserId = /var userId = "(.*.)"/;
                    var reBoardIdx = /var boardIdx = (.*.);/;
                    var reBoardType = /var boardType = "(.*.)"/;
                    var reActionType = /var ActionType = "(.*.)"/;
                    
                    var userId = reUserId.exec(checkProc);
                    var boardIdx = reBoardIdx.exec(checkProc);
                    var boardType = reBoardType.exec(checkProc);
                    var actionType = reActionType.exec(checkProc);
                    
                    if(userId != null) {
                        userId = userId[1];
                        boardIdx = boardIdx[1];
                        boardType = boardType[1];
                        actionType = actionType[1];
                    
                        //console.log(userId);
                        //console.log(boardIdx);
                        //console.log(boardType);
                        //console.log(actionType);
                
                        var data = 'boardType='+boardType+'&Idx='+boardIdx+'&UserID='+userId+'&ActionType='+actionType+'&mode=';
                        console.log(data);
                        
                        $.ajax({
                            url:'/api/checkactions',
                            type:"GET",
                            data:data,
                            dataType:"json",
                            success:function(ret){
                                if(ret.res == 1){
                                    alert(ret.message);
                                }else{
                                    //location.reload();
                                    if(ret.type== "okall"){
                                        $('#foot_all_alert').delay( 1000 ).show();
                                    }else{
                                        $('#alertText').html(ret.message);
                                        $('#CSW_SHARE_OK').delay( 1000 ).show();
                                    }
                                }
                            },
                            error:function(e){
                                alert(e.responseText);
                            }
                        });
                             
                    } else {
                        alert('该服务需要登录');
                    }
                });`;

                chrome.tabs.executeScript(tabId, {
                    code: `
                    var s = document.createElement('script');
                    s.textContent = \`${code}\`;
                    document.head.appendChild(s);
                    ` 
                });
            },
            'viewArticlesTask': (taskSetting, tabId) => {
               
            },
            'getRegex': (title, path) => {
                return '\/\/' + title + '(|\.)fannstar\.tf\.co\.kr' + path;
            },
            'getTaskUrl': (title, path) => {
                return 'https://' + title + '.fannstar.tf.co.kr' + path;
            },
            'getTaskNum': (tabId, valueName, index) => {
                chrome.tabs.executeScript(tabId, {file: "jquery-1.12.1.min.js"}, function() {
                    chrome.tabs.executeScript(tabId, { code: `parseInt($($('.tdstar_mission_tb .mission_num')[${index}]).text().split(' / ')[0])` }, result => {
                        tasks[valueName] = result[0];
                        methods.RenderNum();
                    });
                });  
            },
            'RenderNum': () => {
                el.attendanceNumKR.textContent = tasks.attendanceNumKR;
                el.viewArticlesNumKR.textContent = tasks.viewArticlesNumKR;
                el.viewArticlesNumJP.textContent = tasks.viewArticlesNumJP;
                el.viewArticlesNumCN.textContent = tasks.viewArticlesNumCN;
                el.viewArticlesNumEN.textContent = tasks.viewArticlesNumEN;
                el.viewArticlesNumVN.textContent = tasks.viewArticlesNumVN;
                el.sharePostNumKR.textContent = tasks.sharePostNumKR;
            }
        };

    // Default event listeners
    el.dailypoint.addEventListener('click', methods.checkEvent);
    el.attendance.addEventListener('click', methods.attendanceEvent);
    el.viewArticlesKR.addEventListener('click', methods.Event);
    el.viewArticlesJP.addEventListener('click', methods.Event);
    el.viewArticlesCN.addEventListener('click', methods.Event);
    el.viewArticlesEN.addEventListener('click', methods.Event);
    el.viewArticlesVN.addEventListener('click', methods.Event);
    el.sharePost.addEventListener('click', methods.Event);
})();