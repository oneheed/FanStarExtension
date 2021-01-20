(() => {
    let el = {
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

        'attendanceNumKR': document.getElementById('attendanceNumKR'),
        'viewArticlesNumKR': document.getElementById('viewArticlesNumKR'),
        'viewArticlesNumJP': document.getElementById('viewArticlesNumJP'),
        'viewArticlesNumCN': document.getElementById('viewArticlesNumCN'),
        'viewArticlesNumEN': document.getElementById('viewArticlesNumEN'),
        'viewArticlesNumVN': document.getElementById('viewArticlesNumVN'),
        'sharePostNumKR': document.getElementById('sharePostNumKR'),

        'vote': document.getElementById('vote'),

        'bkg': chrome.extension.getBackgroundPage()
    },
        methods = {
            'checkEvent': () => {
                el.bkg.methods.checkEvent(methods.renderNum);
            },
            'clearTaskEvent': () => {
                el.bkg.methods.clearTaskEvent();
                methods.renderNum();
            },
            'attendanceEvent': () => {
                el.bkg.methods.attendanceEvent();
            },
            'viewArticlesEvent': (execTaskNames) => {
                el.bkg.methods.viewArticlesEvent(execTaskNames);
            },
            'sharePostEvent': () => {
                el.bkg.methods.sharePostEvent();
            },
            'voteEvent': () => {
                el.bkg.methods.voteEvent();
            },
            'renderNum': () => {
                el.attendanceNumKR.textContent = el.bkg.tasks.attendanceNumKR;
                el.viewArticlesNumKR.textContent = el.bkg.tasks.viewArticlesNumKR;
                el.viewArticlesNumJP.textContent = el.bkg.tasks.viewArticlesNumJP;
                el.viewArticlesNumCN.textContent = el.bkg.tasks.viewArticlesNumCN;
                el.viewArticlesNumEN.textContent = el.bkg.tasks.viewArticlesNumEN;
                el.viewArticlesNumVN.textContent = el.bkg.tasks.viewArticlesNumVN;
                el.sharePostNumKR.textContent = el.bkg.tasks.sharePostNumKR;
            }
        };

    //el.bkg.console.log(el.bkg.tasks);
    if (el.bkg.methods.getDate() > el.bkg.tasks.updateDate) {
        el.bkg.methods.clearTaskEvent();
    }
    methods.renderNum();

    // Default event listeners
    el.dailypoint.addEventListener('click', methods.checkEvent);
    el.clearTask.addEventListener('click', methods.clearTaskEvent);

    el.attendance.addEventListener('click', methods.attendanceEvent);

    el.viewArticlesALL.addEventListener('click', () => { methods.viewArticlesEvent(['KR', 'JP', 'CN', 'EN', 'VN']) });
    el.viewArticlesKR.addEventListener('click', () => { methods.viewArticlesEvent(['KR']) });
    el.viewArticlesJP.addEventListener('click', () => { methods.viewArticlesEvent(['JP']) });
    el.viewArticlesCN.addEventListener('click', () => { methods.viewArticlesEvent(['CN']) });
    el.viewArticlesEN.addEventListener('click', () => { methods.viewArticlesEvent(['EN']) });
    el.viewArticlesVN.addEventListener('click', () => { methods.viewArticlesEvent(['VN']) });

    el.sharePost.addEventListener('click', methods.sharePostEvent);

    el.vote.addEventListener('click', methods.voteEvent);
})();