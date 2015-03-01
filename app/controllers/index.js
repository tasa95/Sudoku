function goToCreationOfSudoku()
{
	
	var c = Alloy.createController("CreationSudoku",{});
	c.getView().open() ; 		
}
function goToStat(){
	var scores = Alloy.createController('statistic').getView();
    $.navGroup.openWindow(scores);
}

function goToAbout(){
	var scores = Alloy.createController('about').getView();
    $.navGroup.openWindow(scores);
}

$.mainWindow.hideNavBar();
$.navGroup.open();

