var script = document.createElement('script');
script.textContent =`
    location.href = $(".newsImg.imgLiquidFill a")[0].href;

    var artid = suda.param.postid.split('|')[1].split('_')[1];
    var code = suda.param.postid.split('|')[1].split('_')[0];
    var artids = [];
    // for(var i=0; i<30; i++) {
    //     artids[i]=artid-i;
    //     setTimeout(function(j){$.post( "/news/getpointv3", { artid: artids[j], code : code}).done(function( data ) { console.log(data); })}, 500*i, i);
    // }
    console.log(artids);
`;
(document.head||document.documentElement).appendChild(script);
script.remove();