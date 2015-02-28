var args = arguments[0] || {};


function closeWindow()
{
	$.QuitGame.close();
	
	
}


function quitGame()
{
	$.QuitGame.close();
	
	$.QuitGame.fireEvent('exit',{
		retour : 0
		
	});
}
