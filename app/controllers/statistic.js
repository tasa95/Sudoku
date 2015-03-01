function goToBestScore(){
	var bestScores = Alloy.createController('bestScore').getView();
    $.navGroup.openWindow(bestScores);
}

function goToScores(){
	var scores = Alloy.createController('scores').getView();
    $.navGroup.openWindow(scores);
}

function backHome(){
	$.navGroup.close();
}
$.windowStats.hideNavBar();