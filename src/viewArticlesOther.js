var script = document.createElement('script');
script.textContent =`
    let reArtid = /artid: "(.*.)" ,/;
    let reCode = /code : "(.*.)"/;

    let artid = reArtid.exec(getPoint)[1];
    let code = reCode.exec(getPoint)[1];

    let artids = [];
    for(let i=0; i<30; i++) {
        artids[i]=artid-i;
        setTimeout(function(j){$.post( "/news/getpointv3", { artid: artids[j], code : code}).done(function( data ) { console.log(data); })}, 200*i, i);
    }
    console.log(artids);
    console.log('viewArticlesOther');
`;
(document.head||document.documentElement).appendChild(script);
//script.remove();