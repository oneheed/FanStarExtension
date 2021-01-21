var script = document.createElement('script');
script.textContent = `
    var data = 'accessFrom=web&TplType=' + timeup;
    console.log(data);

    $.ajax({
        url: '/api/timeupnew', type: "GET", data: data, dataType: "json",
        success: function (ret) {
            if (ret.res == 1) {
                alert(ret.message);
                gprocess = "false";
            } else {
                alert(ret.message);
                $('#waitbutton').hide(); $('#waitdonebutton').show();
            }
        },
        error: function (e) { alert(e.responseText); gprocess = "false"; }
    });
`;
(document.head || document.documentElement).appendChild(script);
//script.remove();