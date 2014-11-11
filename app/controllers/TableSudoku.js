var width = Titanium.Platform.displayCaps.platformWidth;
var height = Titanium.Platform.displayCaps.platformHeight * 0.60;
var border = (width * 0.3) /100;
var tinyBorderHorizontal = (height * 0.005);
var tinyBorderVertical = (width * 0.005);


var row_height = (height * 0.90 )/ 9;
var cell_width = (width * 0.90) / 9;
var color_border = '#040430';
var second_color = '#D9F1FE';
var first_color = '#FFFFFF' ;

var sudoku = arguments[0] || {};


var tableData = [ ];

			
var table = Ti.UI.createTableView({});


var number_line = sudoku.length - 1;

for (var i = 0; i < number_line; i++)
{	
	var row = Ti.UI.createTableViewRow({
    className: 'row',
    objName: 'row_'+i,
    textAlign : Titanium.UI.TEXT_ALIGNMENT_CENTER,
    layout:"vertical",
    backgroundColor : $.TableSudoku.backgroundColor,
    height: row_height
  
  });
 
  var LineSudokuView = Ti.UI.createView({
    backgroundColor:'#FFFFFF',
    objName: 'horizontalView',
    rowID: i,
	height: Ti.UI.FILL,
    layout : "horizontal",
    width: Ti.UI.FILL,
    
  });
if(sudoku[i])
{	
	
	number_column = sudoku[i].length;
	for(var j =0 ; j < number_column  ; j++)
	{ 
		var random = Math.floor(Math.random() * 1000);
		
		if( (Math.floor(j/3) + Math.floor(i/3)*3) %2 === 0)
		{
			var color = first_color;
		}
		else
		{
			var color = second_color;
		} 
		
		var hide = ( random %3 == 0 || random % 5 == 0 || random % 7 == 0 || random % 13 == 0 || random % 17 == 00 || random % 19 == 0 || random % 23 == 0 || random % 29 == 0 );
		if(!hide)
		{
			var textField = Ti.UI.createTextField({
		    	value: sudoku[i][j],
	    		touchEnabled : true,
	    		editable : true,
		  });
			
    	}
    	else
    	{
    		var textField = Ti.UI.createTextField({
	    	});
	    	
	    	
    	}
    	
    	textField.height = row_height;
    	textField.width = cell_width;
    	textField.textAlign = Titanium.UI.TEXT_ALIGNMENT_CENTER;
    	textField.backgroundColor = color;
    	textField.focusable = true;
    	
    	
    	textField.addEventListener('change',function(e){
		    var letters = /^[0-9,]+$/;  
		 
		    if (e.value.match(letters)){
		        e.source.oldValue = e.value;
		    }else{
		        e.source.value = e.source.oldValue;
		 
		    }
		});
	 // textField.top = tinyBorderHorizontal;	

	  LineSudokuView.add(textField); 
	  if(j  < 8)
	  {
	  var VerticalBorder = Ti.UI.createView({
		    	backgroundColor: color_border,
		    	width: tinyBorderVertical,
		    	top: 0,
		    	bottom: 0,
		    	right: 0,
		    	height: Ti.UI.FILL 
			});
			
			//LineSudokuView.add(VerticalBorder);	
		}
	   	
	}
}
  
  row.add(LineSudokuView);

 	var HorizontalBorder = Ti.UI.createView({
    	backgroundColor: color_border,
    	width: Ti.UI.FILL,
    	top: 0,
    	bottom: 0,
    	right: 0,
    	height: tinyBorderHorizontal 
	});
	row.add(HorizontalBorder);

  
  tableData.push(row);
  
  row = null;
}

table.setData(tableData);
/*
table.addEventListener('swipe', function(e){
  if (e.source && e.source.objName !== 'table'){
    Ti.API.info('Row swiped: ' + e.source);
    Ti.API.info('Row swiped: ' + e.source.objName);
    Ti.API.info('Row ID : ' + e.source.rowID);
  }
});

*/


$.Sudoku.add(table);	

