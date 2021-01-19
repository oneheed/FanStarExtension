var script = document.createElement('script');
script.textContent =`
$(function() {
    let pageid = document.URL.split('fannstar.tf.co.kr/news/view/')[1];
    setTimeout(function(j){addAction("adview"+j, pageid); console.log("adview"+j);}, 500*1, 1);
    setTimeout(function(j){addAction("adview"+j, pageid); console.log("adview"+j);}, 500*2, 3);
    //setTimeout(function(j){addAction("adview"+j, pageid); console.log("adview"+j);}, 500*3, 6);
    
    let artid = $('meta[property="dable:item_id"]').attr('content');
    let code = checklangs;
    let artids = [];
    for(let i=0; i<30; i++) {
        artids[i]=artid-i;
        setTimeout(function(j){$.post( "/news/getpointv3", { artid: artids[j], code : code}).done(function( data ) { data.message = '('+j+')'+data.message; console.log(data); if(j===29){alert('Finish!');} })}, 300*i, i);
    }
    console.log(artids);
    console.log('viewArticlesKR');
});
`;
(document.head||document.documentElement).appendChild(script);
//script.remove();