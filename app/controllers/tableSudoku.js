// Function to test if device is iOS 7 or later
function isIOS_Seven_Plus() {
	// iOS-specific test
	if (Titanium.Platform.name == 'iPhone OS') {
		var version = Titanium.Platform.version.split(".");
		var major = parseInt(version[0], 10);
		// Can only test this support on a 3.2+ device
		if (major >= 7) {
			return true;
		}
	}
	return false;
}

function createNewGame() {
	var c = Alloy.createController("newGame",{});
	c.getView().addEventListener("restart",function(e){
		$.windowTable.close();
		$.windowTable.fireEvent('new_game', {
		retour : 0
		});
	});
	c.getView().open() ;

}

function ExitGame() {
	var c = Alloy.createController("QuitGame",{});
	c.getView().addEventListener("exit",function(e){
		$.windowTable.close();
		$.windowTable.fireEvent('quitGame', {
		retour : 0
		});
	});
	c.getView().open() ; 
}

function saveScore(){
	
	var secondModel = parseInt($.Second.text, 10);
	var minuteModel = parseInt($.Minute.text, 10);
	var hourModel = parseInt($.Hour.text, 10);

	
	var scoreModel = Alloy.createModel('score',{
		hour : hourModel,
		minute : minuteModel,
		second : secondModel,
	});
	
	scoreModel.save();
}

function timer(addTime) {
	var left_over = 0;
	var second = parseInt($.Second.text, 10);
	var minute = parseInt($.Minute.text, 10);
	var hour = parseInt($.Hour.text, 10);
	if (!addTime) {
		second++;
	} else {
		second = second + addTime;
	}

	if (second >= 60) {
		var left_over = second % 60;
		second = left_over;
		minute++;
		if (minute >= 60) {
			minute = 0;
			hour++;
		}
	}

	if (second >= 0 && second < 10)
		$.Second.text = "0" + second;
	else
		$.Second.text = second;

	if (minute >= 0 && minute < 10)
		$.Minute.text = "0" + minute;
	else
		$.Minute.text = minute;

	if (hour >= 0 && hour < 10)
		$.Hour.text = "0" + hour;
	else
		$.hour.text = hour;

}

var args = arguments[0];
var sudoku = [];
var sudoku = args.table;

/*************************************/

var width = Titanium.Platform.displayCaps.platformWidth;
var height = Titanium.Platform.displayCaps.platformHeight * 0.60;
var border = (width * 0.3) / 100;
var tinyBorderHorizontal = (height * 0.005);
var tinyBorderVertical = (width * 0.005);

var row_height = (height * 0.94 ) / 9;
var cell_width = (width * 0.94) / 9;
var color_border = '#040430';
var second_color = '#D9F1FE';
var first_color = '#FFFFFF';

function stopGame(refreshIntervalId) {
	clearInterval(refreshIntervalId);
	saveScore()
	createNewGame();
}

function verify_valueElement(e) {
	var letters = /^[1-9]+$/;
	var testMultipleZero = /^0*$/;
	if (e.value != e.source.oldValue) {
		if (e.value.match(letters)) {

			e.value = e.value % 10;
			//Ti.API.info("aaa  oldValue = " +e.source.oldValue + " newValue = "+ e.value );
			e.source.oldValue = e.value;
			e.source.value = e.value;
		} else {
			if (e.value === "") {
				e.source.oldValue = e.value;
				e.source.value = e.value;
			} else {
				e.source.value = "";

			}
		}
	}
}

var tableData = [];

var table = Ti.UI.createTableView({
	separatorStyle : 0,
	width : Ti.UI.FILL,
	height : Ti.UI.SIZE,
	bottom : "2%",
	moveable : false,
	moving : false,
	scrollable : false
});

var number_line = sudoku.length - 1;
var empty_cells = 0;
listTextfield = [];
for (var i = 0; i < number_line; i++) {

	var row = Ti.UI.createTableViewRow({
		className : 'row',
		objName : 'row_' + i,
		textAlign : Titanium.UI.TEXT_ALIGNMENT_CENTER,
		layout : "vertical",
		height : row_height,
		moveable : false,
		moving : false,
		scrollable : false,
		focusable : false,
		editable : false,
		touchEnabled : false,
		allowsSelection : false,
	});

	if (Titanium.Platform.name == 'iPhone OS') {
		row.selectionStyle = Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE;
	} else {

	}

	var LineSudokuView = Ti.UI.createView({
		backgroundColor : '#FFFFFF',
		objName : 'horizontalView',
		rowID : i,
		height : Ti.UI.FILL,
		layout : "horizontal",
		width : Ti.UI.FILL,

	});
	if (sudoku[i]) {

		number_column = sudoku[i].length;
		for (var j = 0; j < number_column; j++) {
			var random = Math.floor(Math.random() * 1000);

			if ((Math.floor(j / 3) + Math.floor(i / 3) * 3) % 2 === 0) {
				var color = first_color;
			} else {
				var color = second_color;
			}

			var hide = (random % 5 == 0 || random % 7 == 0 || random % 13 == 0 || random % 17 == 00 || random % 19 == 0 || random % 23 == 0 || random % 29 == 0 );
			if (!hide) {
				var textField = Ti.UI.createTextField({
					value : sudoku[i][j],
					touchEnabled : false,
					editable : false,
					keyboardType : Titanium.UI.KEYBOARD_NUMBER_PAD,
					id : "textField_" + i + "_" + j
				});

			} else {
				var textField = Ti.UI.createTextField({
					keyboardType : Titanium.UI.KEYBOARD_NUMBER_PAD,
					value : "",
					id : "textField_" + i + "_" + j
				});
				empty_cells++;
				//textField.returnKeyType = Titanium.UI.RETURNKEY_GO;

				if ( typeof Ti.Platform.name !== 'undefined' && Ti.Platform.name === 'iPhone OS') {

				} else {
					textField.returnKeyType = Titanium.UI.RETURNKEY_DONE;
				}

			}

			textField.height = row_height;
			textField.width = cell_width;
			textField.textAlign = Titanium.UI.TEXT_ALIGNMENT_CENTER;
			textField.backgroundColor = color;
			textField.focusable = true;
			listTextfield[j + (i * 9)] = textField;

			textField.addEventListener('change', function(e) {
				if (e.value != e.source.oldValue) {
					verify_valueElement(e);
					var element = e.source;
					var id = element.id + "";
					var fields = id.split("_");
					if (sudoku[fields[1]][fields[2]] == e.source.value) {
						element.color = "#1E6912";
						empty_cells--;
					} else {
						element.color = "#801A15";
						Ti.API.error("e.value : '"+e.source.value+"'");
						if (e.source.value.length > 0 )
						{
							timer(30);
						
							showMessageTimeout = function(customMessage, interval) {
							// window container
							indWin = Titanium.UI.createWindow();

							//  view
							var indView = Titanium.UI.createView({
								height : 50,
								width : 250,
								borderRadius : 10,
								backgroundColor : '#aaa',
								opacity : .7
							});

							indWin.add(indView);

							// message
							var message = Titanium.UI.createLabel({
								text : customMessage && typeof (customMessage !== 'undefined') ? customMessage : L('please_wait'),
								color : '#fff',
								width : 'auto',
								height : 'auto',
								textAlign : 'center',
								font : {
									fontFamily : 'Helvetica Neue',
									fontSize : 12,
									fontWeight : 'bold'
								}
							});

							indView.add(message);
							indWin.open();

							interval = interval ? interval : 3000;
							setTimeout(function() {
								indWin.close({
									opacity : 0,
									duration : 1000
								});
							}, interval);
						};

						showMessageTimeout("Pénalité de 30 sec", 200);
					}
					}

					Ti.API.info("empty_cells= " + empty_cells);
					if (empty_cells == 0) {
						stopGame(refreshId);
						for (var i = 0; i < listTextfield.length; i++) {
							listTextfield[i].touchEnabled = false;
						}
					}
					this.blur();

				}
			});

			// textField.top = tinyBorderHorizontal;

			LineSudokuView.add(textField);
			if (j < 8) {
				var VerticalBorder = Ti.UI.createView({
					backgroundColor : color_border,
					width : tinyBorderVertical,
					top : 0,
					bottom : 0,
					right : 0,
					height : Ti.UI.FILL
				});

				LineSudokuView.add(VerticalBorder);
			}

		}
	}

	row.add(LineSudokuView);

	var HorizontalBorder = Ti.UI.createView({
		backgroundColor : color_border,
		width : Ti.UI.FILL,
		top : 0,
		bottom : 0,
		right : 0,
		height : tinyBorderHorizontal
	});
	row.add(HorizontalBorder);

	tableData.push(row);

}
var HorizontalBorder = Ti.UI.createView({
	backgroundColor : color_border,
	width : Ti.UI.FILL,
	top : 0,
	bottom : 0,
	right : 0,
	height : tinyBorderHorizontal
});
row.add(HorizontalBorder);
table.setData(tableData);

$.Sudoku.add(table);
refreshId = setInterval(timer, 1000);

$.windowTable.addEventListener('click', function(e) {
	for (var index = 0; index < listTextfield.length; index++) {
		//Ti.API.info(index);
		listTextfield[index].blur();
		//Hiding each keyboards
	}
});

var iOS_seven = isIOS_Seven_Plus();
var theTop = iOS_seven ? 20 : 0;
var window = $.windowTable;
window.top = theTop;




//********************************************LISTENER*******************************************/
/*
Ti.App.addEventListener('restart', function(e) {
	// logs 'bar'
	
	Ti.App.removeEventListener('restart',function(e){		
	});
	
});


Ti.App.addEventListener('exit', function(e) {
	// logs 'bar'
	$.windowTable.close();
	Ti.App.fireEvent('quitGame', {
		retour : 0
	});	
	Ti.App.removeEventListener('exit',function(e){
	});	
});
*/

