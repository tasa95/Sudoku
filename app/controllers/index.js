function doClick(e) {
    alert($.label.text);
}


function goToCreationOfSudoku()
{
	
	var c = Alloy.createController("CreationSudoku",{});
	c.getView().open() ; 		
}

$.index.open();
goToCreationOfSudoku();


