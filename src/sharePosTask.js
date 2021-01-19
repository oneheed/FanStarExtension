var script = document.createElement('script');
script.textContent =`
    let reUserId = /var userId = "(.*.)"/;
    let reBoardType = /var boardType = "(.*.)"/;

    let userId = reUserId.exec(addAction);
    let boardType = reBoardType.exec(addAction);

    if(userId != null) {
        userId = userId[1];
        boardType = boardType[1];

        for(let i = 0; i < 10; i++) {
            boardIdx = $('.share')[i].id.split('_')[1];

            //console.log(userId);
            //console.log(boardIdx);
            //console.log(boardType);

            var data = "boardType="+boardType+"&Idx="+boardIdx+"&UserID="+userId+"&ActionType=share&ActionSns=tw";
            console.log(data);
        
            // $.ajax({
            //     url:'/api/checkactions',
            //     type:"GET",
            //     data:data,
            //     dataType:"json",
            //     success:function(ret){
            //         console.log(ret.message);
            //     },
            //     error:function(e){
            //         alert(e.responseText);
            //     }
            // }); 
        }
    } else {
        alert("该服务需要登录");
    }
`;
(document.head||document.documentElement).appendChild(script);
script.remove();