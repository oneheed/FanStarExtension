// 分享內容

var script = document.createElement('script');
script.textContent = `
    var reUserId = /var userId = "(.*.)"/;
    var reBoardType = /var boardType = "(.*.)"/;

    var userId = reUserId.exec(addAction);
    var boardType = reBoardType.exec(addAction);

    if (userId != null) {
        userId = userId[1];
        boardType = boardType[1];

        for (let i = 0; i < 10; i++) {
            boardIdx = $('.share')[i].id.split('_')[1];

            //console.log(userId);
            //console.log(boardIdx);
            //console.log(boardType);

            var data = "boardType=" + boardType + "&Idx=" + boardIdx + "&UserID=" + userId + "&ActionType=share&ActionSns=tw";
            console.log(data);

            setTimeout(function (j, data) {
                $.ajax({
                    url: '/api/addactions',
                    type: "GET",
                    data: data,
                    dataType: "json",
                    success: function (ret) {
                        ret.message = '(' + j + ')' + ret.message;
                        console.log(ret.message);
                        if (j === 9) {
                            alert('Finish!');
                        }
                    },
                    error: function (e) {
                        alert(e.responseText);
                    }
                });
            }, 400 * i, i, data)
        }
    } else {
        alert("该服务需要登录");
    }
`;
(document.head || document.documentElement).appendChild(script);
script.remove();