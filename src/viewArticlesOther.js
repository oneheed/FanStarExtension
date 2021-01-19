var script = document.createElement('script');
script.textContent =`
    let reArtid = /artid: "(.*.)" ,/;
    let reCode = /code : "(.*.)"/;

    let artid = reArtid.exec(getPoint)[1];
    let code = reCode.exec(getPoint)[1];

    let artids = [];
    for(let i=0; i<30; i++) {
        artids[i]=artid-i;
        setTimeout(function(j){$.post( "/news/getpointv3", { artid: artids[j], code : code}).done(function( data ) { data.message = '('+j+')'+data.message; console.log(data); if(j===29){alert('Finish!');} })}, 300*i, i);
    }
    console.log(artids);
    console.log('viewArticlesOther');
`;
(document.head||document.documentElement).appendChild(script);
//script.remove();