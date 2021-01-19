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
        tasks = {
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
                el.bkg.methods.checkEvent();
            },
            'attendanceEvent': () => {
                el.bkg.methods.attendanceEvent();
            },
            'viewArticlesEvent': (execTaskNames) => {
                el.bkg.methods.viewArticlesEvent(execTaskNames);
            },
            'sharePosEvent': () => {
                el.bkg.methods.sharePosEvent();
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
    el.viewArticlesKR.addEventListener('click', () => { methods.viewArticlesEvent(['KR']) });
    el.viewArticlesJP.addEventListener('click', () => { methods.viewArticlesEvent(['JP']) });
    el.viewArticlesCN.addEventListener('click', () => { methods.viewArticlesEvent(['CN']) });
    el.viewArticlesEN.addEventListener('click', () => { methods.viewArticlesEvent(['EN']) });
    el.viewArticlesVN.addEventListener('click', () => { methods.viewArticlesEvent(['VN']) });
    el.sharePost.addEventListener('click', methods.sharePosEvent);
})();