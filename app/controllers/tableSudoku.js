var args = arguments[0] ;
var sudoku = [];
var sudoku = args.table;
Ti.API.info(sudoku);



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
}

function verify_valueElement(e) {
	var letters = /^[0-9]+$/;
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
		selectionStyle : Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE
	});

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

			var hide = (random % 3 == 0 || random % 5 == 0 || random % 7 == 0 || random % 13 == 0 || random % 17 == 00 || random % 19 == 0 || random % 23 == 0 || random % 29 == 0 );
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

			}

			textField.height = row_height;
			textField.width = cell_width;
			textField.textAlign = Titanium.UI.TEXT_ALIGNMENT_CENTER;
			textField.backgroundColor = color;
			textField.focusable = true;

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
					}

					Ti.API.info("empty_cells= " + empty_cells);
					if (empty_cells == 0) {
						stopGame(refreshId);
					}
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

setInterval(function() {
	$.Second.text++;
	if ($.Second.text >= 0 && $.Second.text < 10) {
		$.Second.text = "0" + $.Second.text;
	}
	if ($.Second.text % 60 == 0) {
		$.Minute.text++;
		if ($.Minute.text >= 0 && $.Minute.text < 10) {
			$.Minute.text = "0" + $.Minute.text;
		}

		$.Second.text = 0;

		if ($.Minute.text % 60 == 0) {
			$.Hour.text++;
			$.Minute.text = 00;
			if ($.Hour.text > 0 && $.Hour.text < 10) {
				$.Hour.text = "0" + $.Hour.text;
			}

		}
	}

}, 1000);

