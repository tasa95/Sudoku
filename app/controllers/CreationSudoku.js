function goToSudoku(sudoku) {
	var tableSudokuController = Alloy.createController("tableSudoku", {
		table : sudoku
	});
	tableSudokuController.getView().open();
	$.windowActivity.hide();

}

function InitTable() {
	var table = [];
	for (var i = 0; i < 9; i++) {
		table[i] = [];
		for (var j = 0; j < 9; j++) {
			table[i][j] = j + 1;
		}
	}
	return sortTable(table);
}

function setProb(sector, column, values) {
	var tableTry = [];
	
	if (!Array.isArray(column))
		column = [];

	if (!Array.isArray(sector))
		sector = [];
	
	for (var i = 0; i < values.length; i++) {

		if (((column.indexOf(values[i]) == -1 && sector.indexOf(values[i]) == -1 ) )) {
			//Ti.API.debug("values add = " + values[i]);	
			tableTry.push(values[i]);
		}
	}
	if(tableTry.length == 0)
	{
		Ti.API.error("table lot = 0");	
		Ti.API.error("values add = " + values);	
	}
	
	return tableTry;
}

function setRandom(listOfProb) {
	var val = 0;
	val = Math.random() * 10;
	val = Math.floor(val % listOfProb.length);

	return listOfProb[val];
}

function tableIsEmpty(table) {
	var i = 0;
	var size = 0;
	for (var i = 0; i < table.length; i++) {
		if (size < table.length) {
			size = table.length;
		}
	}
	if (size == 0)
		return true;
	else
		return false;

}

function checkWhereThereIsLessProb(ListOfListOfValues, tableIndex_check) {
	var i = 0;
	var index = 0;
	var size_min = 100;
	var numberOfUniqueProb = 0;
	if (Array.isArray(ListOfListOfValues)) {
		for ( i = 0; i < ListOfListOfValues.length; i++) {
			//Ti.API.info("taille " + ListOfListOfValues[i].length);
			if (ListOfListOfValues[i].length < size_min && tableIndex_check.indexOf(i) == -1) {

				size_min = ListOfListOfValues[i].length;
				index = i;
			}

			if (ListOfListOfValues[i].length == 1) {
				numberOfUniqueProb++;
			}
		}
	}

	if (tableIndex_check.length == 9)
		return -1;
	else {
		if (numberOfUniqueProb != 9) {
			return index;
		}
		for (var i = 0; i < ListOfListOfValues.length; i++) {
			if (tableIndex_check.indexOf(i) == -1) {
				return i;
			}
		}

	}

}

function AffichageInConsole(tableSudoku) {
	var string = "";
	for (var i = 0; i < 9; i++) {
		string += "\n|";
		for (var j = 0; j < 9; j++) {
			if ( typeof tableSudoku === 'undefined' || typeof tableSudoku[i] === 'undefined' || !(tableSudoku[i][j]) || !(Array.isArray(tableSudoku[i]) )) {

				string += "_";
			} else {
				string += tableSudoku[i][j];
			}
		}
		string += "|\n";
	}
	Ti.API.info("tableau " + string);
}

function getValues(i, probTableSudoku, index) {
	var table_number = [];
	var compteur = [];
	if (probTableSudoku[index].length > 1) {
		for (var y = 0; y < probTableSudoku.length; y++) {
			for (var x = 0; x < probTableSudoku[y].length; x++) {
				if (index != y)
				table_number.push(probTableSudoku[y][x]);// Récupération de toutes les possibilités sur la même ligne
			}
		}
		for (var x = 0; x < probTableSudoku.length; x++) {
			for (var y = 0; y < probTableSudoku[x].length; y++) {
				if (index != x) {
					if (!(compteur[probTableSudoku[x][y]]) || typeof compteur[probTableSudoku[x][y]] === 'undefined')
						compteur[probTableSudoku[x][y]] = 0;
					// on établit un compteur de chiffre afin d'avoir le chiffre dont l'occurence est moindre que les autres

					compteur[probTableSudoku[x][y]]++;
				}
			}
		}
		var less = 100;
		var value = 0;
		var tab_value = [];
		Ti.API.info("index = " + index);
		for (var y = 1; y < compteur.length; y++) {
			if (compteur[y] < less) {
				if (probTableSudoku[index].indexOf(y) !== -1) {
					tab_value = [];
					tab_value.push(y);
					// on le récupére dans value
					less = compteur[y];
					//Ti.API.info("reinitialisation = " + y);
				}
			} else {
				if (compteur[y] == less) {
					if (probTableSudoku[index].indexOf(y) !== -1) {
						tab_value.push(y);
						//Ti.API.info("et encore = " + y);
					}
				}
			}
		}
		return tab_value;
	} else {
		Ti.API.info("index = " + index);

		Ti.API.info("value = " + probTableSudoku[index][0]);
		Ti.API.info("value = " + probTableSudoku[index]);

		return probTableSudoku[index];
	}
}

function insertInSudoku(i, index, tableSudoku, probTableSudoku, tableColumn, tableSector, table) {

	if(probTableSudoku[i].length > 1)
		tableSudoku[i][index] = setRandom(getValues(i, probTableSudoku[i], index));
	else
		tableSudoku[i][index] = setRandom( probTableSudoku[i]);

	if ( typeof tableColumn[index] === 'undefined' || !(tableColumn[index]) || !(Array.isArray(tableColumn[index]))) {
		tableColumn[index] = [];
		//Ti.API.info("tabColumn = " + index);
	}

	if ( typeof tableSector[Math.floor(index / 3) + Math.floor(i / 3) * 3] === 'undefined' || !(tableSector[Math.floor(index / 3) + Math.floor(i / 3)]) || !(Array.isArray(tableSector[Math.floor(index / 3) + Math.floor(i / 3)]))) {
		tableSector[Math.floor(index / 3) + Math.floor(i / 3) * 3] = [];
		//Ti.API.info("tabSector = " +Math.floor(index/3) + Math.floor(i/3));
	}
	tableColumn[index].push(tableSudoku[i][index]);
	tableSector[Math.floor(index / 3) + Math.floor(i / 3) * 3].push(tableSudoku[i][index]);
	//table[i].splice(table[i].indexOf(tableSudoku[i][index]), 1);
	table[i]=table[i].filter(function (element){
		return element != tableSudoku[i][index];
	});
	AffichageInConsole(tableSudoku);

}

function sortTable(table) {
	var tableSudoku = [];
	// Tableau pour le sudoku
	var probTableSudoku = [];
	// tableau ayant le même nombre de case que le tableau de sudoku, permettant d'établir des probabilités
	var tableTry = [];
	// Tableau contenant les chiffres pouvant être mis dans une case
	var lastValue = 0;
	var tableColumn = [];
	// tableau permettant de savoir ce qu'il y a dans la colonne
	var tableSector = [];
	// et dans le secteur
	var tableIndex_check = [];
	var index = 0;
	var i = 0;
	var j = 0;
	tableSudoku[0] = [];
	probTableSudoku[0] = [];
	if (Array.isArray(table)) {
		while (i < 9) {

			for ( j = 0; j < 9; j++) {
				if ( typeof tableColumn[j] === 'undefined' || !(tableColumn[j]) || !(Array.isArray(tableColumn[i]))) {
					tableColumn[j] = [];
					Ti.API.info("tabColumn = " + j);
				}

				if (!(tableSector[Math.floor(j / 3) + Math.floor(i / 3) * 3] )) {
					tableSector[Math.floor(j / 3) + Math.floor(i / 3) * 3] = [];
					Ti.API.info("tabSector = " + Math.floor(j / 3) + Math.floor(i / 3));
				}

				if (tableIndex_check.indexOf(j) == -1) {
					tableTry = setProb(tableSector[Math.floor(j / 3) + Math.floor(i / 3) * 3], tableColumn[j], table[i]);
					//Récupére un tableau de valeur
					probTableSudoku[i][j] = tableTry;
					// qu'on ajoute au tableau des prob
				} else {
					tableTry.push(tableSudoku[i][j]);
					// récupére la valeur déja rentré dans le tableau et
					probTableSudoku[i][j] = tableTry;
					// qu'on ajoute au tableau des prob

				}
				tableTry = [];
			}

			var index = checkWhereThereIsLessProb(probTableSudoku[i], tableIndex_check);
			// on récupére l'index la ou il y a le moins de nombre

			if (index != -1 && tableIndex_check.indexOf(index) == -1)// Si l'index est différent de -1 est que l'index n'est pas compris dans les index déja rentré.
			{
				insertInSudoku(i, index, tableSudoku, probTableSudoku, tableColumn, tableSector, table);
				tableIndex_check.push(index);
			} else {
				i++;
				j = 0;
				tableIndex_check = [];
				probTableSudoku[i] = [];
				tableSudoku[i] = [];
			}
		}
	}

	return tableSudoku;
}

if ( typeof Ti.Platform.name !== 'undefined' && Ti.Platform.name === 'iPhone OS') {
	style = Ti.UI.iPhone.ActivityIndicatorStyle.DARK;
} else {
	style = Ti.UI.ActivityIndicatorStyle.DARK;
}
if ( typeof Ti.Platform.name !== 'undefined') {
	$.activityIndicator.style = style;
}

$.activityIndicator.show();

var sudoku = InitTable();

$.activityIndicator.hide();

goToSudoku(sudoku);

