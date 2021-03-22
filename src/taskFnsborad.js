// 粉絲團

var script = document.createElement('script');
script.textContent = `
    let reUserId = /var userId = "(.*.)"/;
    let userId = reUserId.exec(openwrite);

    if(userId != null) {
        userId = userId[1];
        let boardType = 'BoardFan_kr';
        let flag = 'recommend';
            
        for(let i=0; i<10; i++) {		
            setTimeout(function(j){
                let boardIdx = list[j].Idx;
                let data = "boardType="+boardType+"&Idx="+boardIdx+"&UserID="+userId+"&ActionType="+flag;
                
                //console.log(data)
                
                $.ajax({
                    url:'/api/addactions',
                    type:"GET",
                    data:data,
                    dataType:"json",
                    success:function(ret){
                        console.log(ret);
                    },
                    error:function(e){
                        console.log(e);
                    }
                });
                
            }, 100*i, i);
        }
    } else {
        alert("该服务需要登录");
    }
`;
(document.head || document.documentElement).appendChild(script);
//script.remove();