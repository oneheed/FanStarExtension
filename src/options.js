(() => {
    let el = {
            'main': document.getElementById('main'),
            'dailypoint': document.getElementById('dailypoint'),
            'clearTask': document.getElementById('clearTask'),

            'attendance': document.getElementById('attendance'),
            'viewArticlesALL': document.getElementById('viewArticlesALL'),
            'viewArticlesKR': document.getElementById('viewArticlesKR'),
            'viewArticlesJP': document.getElementById('viewArticlesJP'),
            'viewArticlesCN': document.getElementById('viewArticlesCN'),
            'viewArticlesEN': document.getElementById('viewArticlesEN'),
            'viewArticlesVN': document.getElementById('viewArticlesVN'),
            'sharePost': document.getElementById('sharePost'),
            'fnsborad': document.getElementById('fnsborad'),

            'attendanceNumKR': document.getElementById('attendanceNumKR'),
            'viewArticlesNumKR': document.getElementById('viewArticlesNumKR'),
            'viewArticlesNumJP': document.getElementById('viewArticlesNumJP'),
            'viewArticlesNumCN': document.getElementById('viewArticlesNumCN'),
            'viewArticlesNumEN': document.getElementById('viewArticlesNumEN'),
            'viewArticlesNumVN': document.getElementById('viewArticlesNumVN'),
            'sharePostNumKR': document.getElementById('sharePostNumKR'),
            'fnsBoradNumKR': document.getElementById('fnsBoradNumKR'),

            'timeupSun': document.getElementById('timeupSun'),
            'timeupMoon': document.getElementById('timeupMoon'),

            'vote': document.getElementById('vote'),

            'bkg': chrome.extension.getBackgroundPage()
        },
        events = {
            'mainEvent': () => {
                // Main task
                el.bkg.events.attendanceEvent();
                el.bkg.events.viewArticlesEvent(['KR']);
                el.bkg.events.fnsboradEvent();
            },
            'checkEvent': () => {
                el.bkg.events.checkEvent(methods.renderNum);
            },
            'clearTaskEvent': () => {
                el.bkg.events.clearTaskEvent();

                methods.renderNum();
            },
            'attendanceEvent': () => {
                el.bkg.events.attendanceEvent();
            },
            'viewArticlesEvent': (execTaskNames) => {
                el.bkg.events.viewArticlesEvent(execTaskNames);
            },
            'sharePostEvent': () => {
                el.bkg.events.sharePostEvent();
            },
            'timeupEvent': (timeup) => {
                el.bkg.events.timeupEvent(() => {
                    return timeup
                });
            },
            'voteEvent': () => {
                el.bkg.events.voteEvent();
            },
            'fnsboradEvent': () => {
                el.bkg.events.fnsboradEvent();
            }
        },
        methods = {
            'renderNum': () => {
                // Render task number on extension tool 
                el.attendanceNumKR.textContent = el.bkg.numbers.attendanceNumKR;
                el.viewArticlesNumKR.textContent = el.bkg.numbers.viewArticlesNumKR;
                el.viewArticlesNumJP.textContent = el.bkg.numbers.viewArticlesNumJP;
                el.viewArticlesNumCN.textContent = el.bkg.numbers.viewArticlesNumCN;
                el.viewArticlesNumEN.textContent = el.bkg.numbers.viewArticlesNumEN;
                el.viewArticlesNumVN.textContent = el.bkg.numbers.viewArticlesNumVN;
                el.sharePostNumKR.textContent = el.bkg.numbers.sharePostNumKR;
                el.fnsBoradNumKR.textContent = el.bkg.numbers.fnsBoradNumKR;
            }
        };

    //el.bkg.console.log(el.bkg.tasks);
    if (el.bkg.methods.getDate() > el.bkg.check.updateDate) {
        el.bkg.events.clearTaskEvent();
    }
    methods.renderNum();

    // Add event listeners
    el.main.addEventListener('click', events.mainEvent);
    el.dailypoint.addEventListener('click', events.checkEvent);
    el.clearTask.addEventListener('click', events.clearTaskEvent);

    el.attendance.addEventListener('click', events.attendanceEvent);

    el.viewArticlesALL.addEventListener('click', () => {
        events.viewArticlesEvent(['JP', 'CN', 'EN', 'VN'])
    });
    el.viewArticlesKR.addEventListener('click', () => {
        events.viewArticlesEvent(['KR'])
    });
    el.viewArticlesJP.addEventListener('click', () => {
        events.viewArticlesEvent(['JP'])
    });
    el.viewArticlesCN.addEventListener('click', () => {
        events.viewArticlesEvent(['CN'])
    });
    el.viewArticlesEN.addEventListener('click', () => {
        events.viewArticlesEvent(['EN'])
    });
    el.viewArticlesVN.addEventListener('click', () => {
        events.viewArticlesEvent(['VN'])
    });

    el.timeupSun.addEventListener('click', () => {
        events.timeupEvent('sun')
    });
    el.timeupMoon.addEventListener('click', () => {
        events.timeupEvent('moon')
    });

    el.sharePost.addEventListener('click', events.sharePostEvent);

    el.fnsborad.addEventListener('click', events.fnsboradEvent);

    el.vote.addEventListener('click', events.voteEvent);
})();