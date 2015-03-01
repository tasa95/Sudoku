var scoreCollection = Alloy.Collections.instance('score');
var data = [];
function closeWindow(){
    $.scoreWindow.close();
}

scoreCollection.fetch({
	success : function()
	{
		var bestScore = Alloy.Collections.instance('score');
		_.each(scoreCollection.models,function(element,index)
		{
			if(index == 0){
				bestScore = element ;	
			}
			else{
				if(bestScore.get('hour') >= element.get('hour')){
					if(bestScore.get('hour') > element.get('hour'))	
						bestScore =  element ;		
					else{
						if(bestScore.get('minute') >= element.get('minute')){
							if(bestScore.get('minute') > element.get('minute'))
								bestScore =  element ;
							else{
								if(bestScore.get('second') >= element.get('second'))
									bestScore =  element ;
								
							}
						}
					}
					
				}
			}
			$.valueBestScore.text =  bestScore.get('hour')+"h"+bestScore.get('minute')+"m"+bestScore.get('second')+"s";
		});
	}
});

$.scoreWindow.hideNavBar();
