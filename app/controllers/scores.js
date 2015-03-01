function closeWindow(){
    $.navGroup.close();
    
}
function deleteScore(rowScore){
	var scoreData = Alloy.createCollection("score");
	scoreData.fetch({query:"SELECT * FROM score WHERE id = " + rowScore.rowId});
	 if(scoreData.length > 0){
		scoreData.at(0).destroy();
		Alloy.Collections.score.fetch();
	}
}

$.scoreTableView.addEventListener('click',function(e){

	var recoverDatabase = Alloy.createCollection("score");
	recoverDatabase.fetch({query:"SELECT * FROM score WHERE id = " + e.row.rowId});
	var args={
		hour   : recoverDatabase.at(0).get('hour'),
		minute : recoverDatabase.at(0).get('minute'),
		second : recoverDatabase.at(0).get('second')
	};
	
	var detail = Alloy.createController('detailScore',args).getView();
    $.navGroup.openWindow(detail);
	
	
});

$.scoreTableView.addEventListener('longpress',function(e){
	var row = e.row;
	var alertDialog = Titanium.UI.createAlertDialog({
	    title: 'Supprimer',
	    message: 'Voulez vous supprimer ce score?',
	    buttonNames: ['Oui','Non'],
	    cancel: 1
	});
	alertDialog.show();
	
 	alertDialog.addEventListener('click', function(e) {
 		
	    if (e.index == 0) { 
			deleteScore(row);
	    } else if (e.index == 1) {
	    	}    
	});	
	
});

$.navGroup.addEventListener("close", function(){
    $.destroy();
}); 

Alloy.Collections.score.fetch();
$.scoreWindow.hideNavBar();
$.navGroup.open();
