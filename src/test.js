var s = document.createElement('script');
s.textContent = `
    parseInt($($('.tdstar_mission_tb .mission_num')[0]).text().split(' / ')[0]); 
    parseInt($($('.tdstar_mission_tb .mission_num')[1]).text().split(' / ')[0]);`;
document.head.appendChild(s);


chrome.storage.sync.set({'test': [1, 2, 3, 4]}, function(){
    el.bkg.console.log("Value Saved!")
});
