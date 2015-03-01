function closeWindow(){
    $.navGroup.close();
    
}

$.navGroup.addEventListener("close", function(){
    $.destroy();
}); 



Alloy.Collections.score.fetch();
$.scoreWindow.hideNavBar();
$.navGroup.open();
