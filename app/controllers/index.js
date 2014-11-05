function doClick(e) {
    alert($.label.text);
}

var width = Titanium.Platform.displayCaps.platformWidth;
var height = Titanium.Platform.displayCaps.platformHeight;
var border = (width * 0.3) /100;
var row_height = (height - (height *0.25) )/ 9;
var color_border = '#040430';




function InitTable() {
	var table = [];
	for(var i = 0; i < 9 ; i ++ )
	{
		table[i]=[];
		for(var j = 0 ; j < 9; j++)
		{
			table[i][j] = j+1; 			
		}	
	}
	
	return sortTable(table);
}




function setProb(sector,column,values)
{	
	tableTry = [];
	if(!Array.isArray(column))
			column = [];
			
	if(!Array.isArray(sector))
			sector = [];
	for(var i = 0; i < values.length ; i++)
	{
		
		if( ((column.indexOf(values[i]) ==-1  && sector.indexOf(values[i]) ==-1 ) ))
		{
			tableTry.push(values[i]);	
		}
	}
	return tableTry;
}


function setRandom(listOfProb)
{	
	var val = 0;
	val =  Math.random() *10;
	val	 = Math.floor(val%listOfProb.length);
	
	return listOfProb[val];
}



function tableIsEmpty(table)
{	var i =0;
	var size = 0;
	for(var i = 0 ; i < table.length ; i++)
	{
		if(size < table.length)
		{
			size = table.length;
		}
	}
	if(size == 0)
		return true;
	else
		return false;

}

function checkWhereThereIsLessProb(ListOfListOfValues,tableIndex_check)
{
	var i = 0 ;
	var index = 0;
	var size_min = 100;
	var numberOfUniqueProb =0;
	if(Array.isArray(ListOfListOfValues))
	{
		for (i =0; i< ListOfListOfValues.length; i++)
		{
			//Ti.API.info("taille " + ListOfListOfValues[i].length);
			if(ListOfListOfValues[i].length < size_min && tableIndex_check.indexOf(i) == -1)
			{
			
				size_min = ListOfListOfValues[i].length;
				index = i;
			}
			
			
			if(ListOfListOfValues[i].length  == 1)
			{
				numberOfUniqueProb++;
			}
		}
	}
	if(numberOfUniqueProb != 9 )
		return index;
	else	
		return -1;
}


function AffichageInConsole(tableSudoku)
{
	var string = "";
	for( var i = 0; i < 9 ;i++)
	{
		string += "\n|";
		for (var j = 0 ; j < 9 ; j++)
		{
			if(typeof tableSudoku === 'undefined' || typeof tableSudoku[i] === 'undefined'  || !( tableSudoku[i][j]) || !(Array.isArray(tableSudoku[i]) )  )
			{
				
				string += "_";
			}
			else
			{
				string += tableSudoku[i][j];
			}	
		}
		string += "|\n";	
	}
	Ti.API.info("tableau " + string);
}



function getValues(i,probTableSudoku,index)
{
				var table_number = [];
				var compteur = [];
				if(probTableSudoku[index].length > 1)
				{
					for(var y = 0 ; y < probTableSudoku.length; y++)
					{
						for(var x = 0 ; x < probTableSudoku[y].length; x++)
						{
							if(index != y);									// Récupération de toutes les possibilités sur la même ligne
								table_number.push(probTableSudoku[y][x]);
						}
					}
					for( var x = 0 ;x < probTableSudoku.length ; x++)
					{
						for(var y = 0 ; y < probTableSudoku[x].length ; y++)
						{
							if(index != x)
							{
								if( !(compteur[ probTableSudoku[x][y] ]) || typeof compteur[ probTableSudoku[x][y] ] ==='undefined' )
									compteur[ probTableSudoku[x] [y] ] = 0;		// on établit un compteur de chiffre afin d'avoir le chiffre dont l'occurence est moindre que les autres
								
								compteur[ probTableSudoku[x] [y] ]++; 
							}
						}
					}
					var less = 100;
					var value = 0;
					var tab_value = [];
					Ti.API.info("index = " + index);
					for( var y = 1 ; y < compteur.length ; y++)
					{
						if(compteur[y] < less)
						{
							if(probTableSudoku[index].indexOf(y) !== -1)
							{
								tab_value = [];
								tab_value.push(y);							// on le récupére dans value
								less = compteur[y];
								//Ti.API.info("reinitialisation = " + y);
							}
						}
						else
						{
							if(compteur[y] == less)
							{
								if(probTableSudoku[index].indexOf(y) !== -1)
								{
									tab_value.push(y);
									//Ti.API.info("et encore = " + y);
								}
							}
						}	
					}
				return tab_value;
				}
				else
				{
					return  probTableSudoku[index];
				}
}

function insertInSudoku(i,index,tableIndex_check,tableSudoku,probTableSudoku,tableColumn,tableSector,table,tableTry)
{
				tableIndex_check.push(index);
				
			
				tableSudoku[i][index]=  setRandom(getValues(i,probTableSudoku[i],index));
				
				if( typeof tableColumn[index] === 'undefined'|| !(tableColumn[index]) || !(Array.isArray(tableColumn[index])))
				{
								tableColumn[index] = [];
								//Ti.API.info("tabColumn = " + index);
				}
				
				if( typeof tableSector[Math.floor(index/3) + Math.floor(i/3) *3] === 'undefined'|| !(tableSector[Math.floor(index/3) + Math.floor(i/3)]) || !(Array.isArray(tableSector[Math.floor(index/3) + Math.floor(i/3)])))
				{
								tableSector[Math.floor(index/3) + Math.floor(i/3) *3] = [];
								//Ti.API.info("tabSector = " +Math.floor(index/3) + Math.floor(i/3));
				}
				tableColumn[index].push(tableSudoku[i][index]);
				tableSector[Math.floor(index/3) + Math.floor(i/3) *3].push(tableSudoku[i][index]);
				table[i].splice(table[i].indexOf(tableSudoku[i][index]),1);
				AffichageInConsole(tableSudoku);
				
				
}

function sortTable(table)
{
	var tableSudoku = [];		// Tableau pour le sudoku
	var probTableSudoku =[];		// tableau ayant le même nombre de case que le tableau de sudoku, permettant d'établir des probabilités
	var tableTry = [];			// Tableau contenant les chiffres pouvant être mis dans une case
	var lastValue = 0;
	var tableColumn = [];		// tableau permettant de savoir ce qu'il y a dans la colonne 
	var tableSector = [];		// et dans le secteur
	var tableIndex_check =[];
	var index = 0;
	var i= 0;
	var j =0;
	tableSudoku[0]=[];
	probTableSudoku[0]=[];
	if(Array.isArray(table))
	{
		while(i < 9)
		{
			
			for(j = 0 ; j < 9; j++  )
			{
				if( typeof tableColumn[j] === 'undefined'|| !(tableColumn[j]) || !(Array.isArray(tableColumn[i])))
				{
					tableColumn[j] = [];
					Ti.API.info("tabColumn = " +j);
				}
				
				if( !(tableSector[Math.floor(j/3) + Math.floor(i/3)*3] ))
				{
					tableSector[Math.floor(j/3) + Math.floor(i/3) *3] = [];
					Ti.API.info("tabSector = " +Math.floor(j/3) + Math.floor(i/3));
				}
				
				if(tableIndex_check.indexOf(j) == -1)
				{
				 	tableTry = setProb(tableSector[Math.floor(j/3) + Math.floor(i/3) *3],tableColumn[j],table[i]);		//Récupére un tableau de valeur
				 	probTableSudoku[i][j] = tableTry;			// qu'on ajoute au tableau des prob
				}
				else
				{
					tableTry.push(tableSudoku[i][j]);
					probTableSudoku[i][j] = tableTry;
					
				}
				tableTry =[];
			}
			
			var index = checkWhereThereIsLessProb(probTableSudoku[i],tableIndex_check);		// on récupére l'index la ou il y a le moins de nombre
			
			if(index != -1 && tableIndex_check.indexOf(index) == -1)
			{
				insertInSudoku(i,index,tableIndex_check,tableSudoku,probTableSudoku,tableColumn,tableSector,table,tableTry);
			}
			else
			{
				if(index == -1 )
				{
					index = -1;
					while( index <8)
					{
						index++;
						if(tableIndex_check.indexOf(index) === -1)
						{
							insertInSudoku(i,index,tableIndex_check,tableSudoku,probTableSudoku,tableColumn,tableSector,table,tableTry);
						}
					}
					if(index < 9)
					{
						i++;
						j=0;
						tableIndex_check =[];
						probTableSudoku[i] = [];
						tableSudoku[i] = [];
						//Ti.API.info("Nouvelle ligne = " +i);
					}
				}
			}
		}
	}
	return tableSudoku;
}



var sudoku = InitTable();


var tableData = [ ];

		
var table = Ti.UI.createTableView(
	{
		rowHeight: row_height,
		separatorStyle:0,
		maxRowHeight:29,
		top : "25%",
		width: Ti.UI.FILL ,
		backgroundColor : $.index.backgroundColor,
		left : 1,
	}

);	
var number_line = sudoku.length-1;

for (var i = 0; i < number_line; i++)
{	
	if(i>=3 && i%3 ===0 )
	  {
	  		var borderTop = Ti.UI.createView({
		    	backgroundColor: color_border,
		    	width: Ti.UI.FILL,
		    	top: 0,
		    	bottom: 0,
		    	right: 0,
		    	height: border
			});	
	  	row.add(borderTop);
	  }
	
		
  var row = Ti.UI.createTableViewRow({
    className: 'row',
    objName: 'row_'+i,
    touchEnabled: true,
    textAlign : Titanium.UI.TEXT_ALIGNMENT_CENTER,
    layout:"vertical",
    backgroundColor : $.index.backgroundColor
  });

  var LineSudokuView = Ti.UI.createView({
    backgroundColor:'#FFFFFF',
    objName: 'horizontalView',
    rowID: i,
	height: Ti.UI.FILL,
    layout : "horizontal",
  });
if(sudoku[i])
{	
	
	number_column = sudoku[i].length;
	for(var j =0 ; j < number_column  ; j++)
	{
		 if(j>=3 && j%3 ===0)
	  {
	  		var borderLeft = Ti.UI.createView({
		    	backgroundColor: color_border,
		    	width: border,
		    	top: 0,
		    	bottom: 0,
		    	right: 0,
		    	height: Ti.UI.FILL 
			});	
	  	LineSudokuView.add(borderLeft);
	  }
		var random = Math.floor(Math.random() * 1000);
		var hide = ( random %3 == 0 || random % 5 == 0 || random % 7 == 0 || random % 13 == 0 || random % 17 == 00 || random % 19 == 0 || random % 23 == 0 || random % 29 == 0 );
		if(!hide)
		{
			var textField = Ti.UI.createTextField({
		    	touchEnabled: true,
		    	value: sudoku[i][j],
		    	className : "cell",
		    	id : "cell_"+i+"_"+j,
		    	height: Ti.UI.FILL ,
	    		width: "11%" ,
	    		textAlign : Titanium.UI.TEXT_ALIGNMENT_CENTER,
	    		keyboardType : Ti.UI.KEYBOARD_DECIMAL_PAD ,
	    		editable : false
	    	});
    	}
    	else
    	{
    		var textField = Ti.UI.createTextField({
		    	touchEnabled: true,
		    	className : "cell",
		    	id : "cell_"+i+"_"+j,
		    	height: Ti.UI.FILL ,
	    		width: "11%" ,
	    		textAlign : Titanium.UI.TEXT_ALIGNMENT_CENTER,
	    		keyboardType : Ti.UI.KEYBOARD_DECIMAL_PAD
	    	});
    	}
	  	if(i>=3 && i%3 ===0)
	  	{
	  		textField.top = border;	
	  	}
	  	
	  LineSudokuView.add(textField);
	 
	}
}
  
  row.add(LineSudokuView);
  
  tableData.push(row);
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
		
$.index.add(table);
$.index.open();
