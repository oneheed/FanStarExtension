var script = document.createElement('script');
script.textContent =` 
    let reUserId = /var userId = "(.*.)"/;
    let reBoardIdx = /var boardIdx = (.*.);/;
    let reBoardType = /var boardType = "(.*.)"/;
    let reActionType = /var ActionType = "(.*.)"/;
    
    let userId = reUserId.exec(checkProc);
    let boardIdx = reBoardIdx.exec(checkProc);
    let boardType = reBoardType.exec(checkProc);
    let actionType = reActionType.exec(checkProc);
    
    if(userId != null) {
        userId = userId[1];
        boardIdx = boardIdx[1];
        boardType = boardType[1];
        actionType = actionType[1];
    
        //console.log(userId);
        //console.log(boardIdx);
        //console.log(boardType);
        //console.log(actionType);

        let data = 'boardType='+boardType+'&Idx='+boardIdx+'&UserID='+userId+'&ActionType='+actionType+'&mode=';
        console.log(data);
        
        $.ajax({
            url:'/api/checkactions',
            type:"GET",
            data:data,
            dataType:"json",
            success:function(ret){
                console.log(ret.message);
                alert('Finish!');
            },
            error:function(e){
                alert(e.responseText);
            }
        });           
    } else {
        alert('该服务需要登录');
    }
`;
(document.head||document.documentElement).appendChild(script);
script.remove();