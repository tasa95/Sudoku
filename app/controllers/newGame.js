var args = arguments[0] || {};


function closeWindow()
{
	$.NewGameWindow.close();
}


function newGame()
{
	var c = Alloy.createController("CreationSudoku", {});
	c.getView().open();	
}
