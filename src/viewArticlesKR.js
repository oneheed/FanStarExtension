var script = document.createElement('script');
script.textContent =`
    location.href = $(".newsImg.imgLiquidFill a")[0].href;

    setTimeout(function(j){addAction("adview"+j, thoth.param.pageid); console.log("adview"+j);}, 500*1, 1);
    setTimeout(function(j){addAction("adview"+j, thoth.param.pageid); console.log("adview"+j);}, 500*2, 3);
    //setTimeout(function(j){addAction("adview"+j, thoth.param.pageid); console.log("adview"+j);}, 500*3, 6);

    var artid = $('meta[property="dable:item_id"]').attr('content');
    var code = checklangs;
    var artids = [];
    // for(var i=0; i<30; i++) {
    //     artids[i]=artid-i;
    //     setTimeout(function(j){$.post( "/news/getpointv3", { artid: artids[j], code : code}).done(function( data ) { console.log(data); })}, 500*i, i);
    // }
    console.log(artids);
`;
(document.head||document.documentElement).appendChild(script);
script.remove();