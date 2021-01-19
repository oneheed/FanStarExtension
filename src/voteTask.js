var script = document.createElement('script');
script.textContent =`
    var voteId = $('.RKname stt:contains("Super Junior")')[0].id.split('_')[1]
    votepop.open('star', voteId)
    setTimeout(function(){$('#vPoints').val(200); console.log("add vPoints");}, 500*1);
    setTimeout(function(){votepop.vote(); console.log("OK");}, 500*2);
    //setTimeout(function(){document.vForm.submit(); console.log("submit");}, 500*3);
`;
(document.head||document.documentElement).appendChild(script);
//script.remove();