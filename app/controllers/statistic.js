function goToBestScore(){
	var bestScores = Alloy.createController('bestScore').getView();
    $.navGroup.openWindow(bestScores);
}

function goToScores(){

}

function backHome(){
	$.navGroup.close();
}
$.windowStats.hideNavBar();