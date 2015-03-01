var args = arguments[0] || {};

var row = args;

function closeWindow(){
    $.detailWindow.close();
}

$.valueScore.text =  row.hour+"h"+row.minute+"m"+row.second+"s";
$.detailWindow.hideNavBar();