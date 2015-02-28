var args = arguments[0] || {};


function closeWindow()
{

	$.NewGameWindow.close();

	
}


function newGame()
{
	$.NewGameWindow.close();
	
	 $.NewGameWindow.fireEvent('restart',{
		retour : 0	
	});
}
