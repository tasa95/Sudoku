function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function InitTable() {
        var table = [];
        for (var i = 0; 9 > i; i++) {
            table[i] = [];
            for (var j = 0; 9 > j; j++) table[i][j] = j + 1;
        }
        return sortTable(table);
    }
    function setProb(sector, column, values) {
        tableTry = [];
        Array.isArray(column) || (column = []);
        Array.isArray(sector) || (sector = []);
        for (var i = 0; i < values.length; i++) -1 == column.indexOf(values[i]) && -1 == sector.indexOf(values[i]) && tableTry.push(values[i]);
        return tableTry;
    }
    function setRandom(listOfProb) {
        var val = 0;
        val = 10 * Math.random();
        val = Math.floor(val % listOfProb.length);
        return listOfProb[val];
    }
    function checkWhereThereIsLessProb(ListOfListOfValues, tableIndex_check) {
        var i = 0;
        var index = 0;
        var size_min = 100;
        var numberOfUniqueProb = 0;
        if (Array.isArray(ListOfListOfValues)) for (i = 0; i < ListOfListOfValues.length; i++) {
            if (ListOfListOfValues[i].length < size_min && -1 == tableIndex_check.indexOf(i)) {
                size_min = ListOfListOfValues[i].length;
                index = i;
            }
            1 == ListOfListOfValues[i].length && numberOfUniqueProb++;
        }
        return 9 != numberOfUniqueProb ? index : -1;
    }
    function AffichageInConsole(tableSudoku) {
        var string = "";
        for (var i = 0; 9 > i; i++) {
            string += "\n|";
            for (var j = 0; 9 > j; j++) string += "undefined" != typeof tableSudoku && "undefined" != typeof tableSudoku[i] && tableSudoku[i][j] && Array.isArray(tableSudoku[i]) ? tableSudoku[i][j] : "_";
            string += "|\n";
        }
        Ti.API.info("tableau " + string);
    }
    function getValues(i, probTableSudoku, index) {
        var table_number = [];
        var compteur = [];
        if (probTableSudoku[index].length > 1) {
            for (var y = 0; y < probTableSudoku.length; y++) for (var x = 0; x < probTableSudoku[y].length; x++) {
                index != y;
                table_number.push(probTableSudoku[y][x]);
            }
            for (var x = 0; x < probTableSudoku.length; x++) for (var y = 0; y < probTableSudoku[x].length; y++) if (index != x) {
                compteur[probTableSudoku[x][y]] && "undefined" != typeof compteur[probTableSudoku[x][y]] || (compteur[probTableSudoku[x][y]] = 0);
                compteur[probTableSudoku[x][y]]++;
            }
            var less = 100;
            var tab_value = [];
            Ti.API.info("index = " + index);
            for (var y = 1; y < compteur.length; y++) if (compteur[y] < less) {
                if (-1 !== probTableSudoku[index].indexOf(y)) {
                    tab_value = [];
                    tab_value.push(y);
                    less = compteur[y];
                }
            } else compteur[y] == less && -1 !== probTableSudoku[index].indexOf(y) && tab_value.push(y);
            return tab_value;
        }
        return probTableSudoku[index];
    }
    function insertInSudoku(i, index, tableIndex_check, tableSudoku, probTableSudoku, tableColumn, tableSector, table) {
        tableIndex_check.push(index);
        tableSudoku[i][index] = setRandom(getValues(i, probTableSudoku[i], index));
        "undefined" != typeof tableColumn[index] && tableColumn[index] && Array.isArray(tableColumn[index]) || (tableColumn[index] = []);
        "undefined" != typeof tableSector[Math.floor(index / 3) + 3 * Math.floor(i / 3)] && tableSector[Math.floor(index / 3) + Math.floor(i / 3)] && Array.isArray(tableSector[Math.floor(index / 3) + Math.floor(i / 3)]) || (tableSector[Math.floor(index / 3) + 3 * Math.floor(i / 3)] = []);
        tableColumn[index].push(tableSudoku[i][index]);
        tableSector[Math.floor(index / 3) + 3 * Math.floor(i / 3)].push(tableSudoku[i][index]);
        table[i].splice(table[i].indexOf(tableSudoku[i][index]), 1);
        AffichageInConsole(tableSudoku);
    }
    function sortTable(table) {
        var tableSudoku = [];
        var probTableSudoku = [];
        var tableTry = [];
        var tableColumn = [];
        var tableSector = [];
        var tableIndex_check = [];
        var index = 0;
        var i = 0;
        var j = 0;
        tableSudoku[0] = [];
        probTableSudoku[0] = [];
        if (Array.isArray(table)) while (9 > i) {
            for (j = 0; 9 > j; j++) {
                if ("undefined" == typeof tableColumn[j] || !tableColumn[j] || !Array.isArray(tableColumn[i])) {
                    tableColumn[j] = [];
                    Ti.API.info("tabColumn = " + j);
                }
                if (!tableSector[Math.floor(j / 3) + 3 * Math.floor(i / 3)]) {
                    tableSector[Math.floor(j / 3) + 3 * Math.floor(i / 3)] = [];
                    Ti.API.info("tabSector = " + Math.floor(j / 3) + Math.floor(i / 3));
                }
                if (-1 == tableIndex_check.indexOf(j)) {
                    tableTry = setProb(tableSector[Math.floor(j / 3) + 3 * Math.floor(i / 3)], tableColumn[j], table[i]);
                    probTableSudoku[i][j] = tableTry;
                } else {
                    tableTry.push(tableSudoku[i][j]);
                    probTableSudoku[i][j] = tableTry;
                }
                tableTry = [];
            }
            var index = checkWhereThereIsLessProb(probTableSudoku[i], tableIndex_check);
            if (-1 != index && -1 == tableIndex_check.indexOf(index)) insertInSudoku(i, index, tableIndex_check, tableSudoku, probTableSudoku, tableColumn, tableSector, table, tableTry); else if (-1 == index) {
                index = -1;
                while (8 > index) {
                    index++;
                    -1 === tableIndex_check.indexOf(index) && insertInSudoku(i, index, tableIndex_check, tableSudoku, probTableSudoku, tableColumn, tableSector, table, tableTry);
                }
                if (9 > index) {
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
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "CreationSudoku";
    if (arguments[0]) {
        {
            __processArg(arguments[0], "__parentSymbol");
        }
        {
            __processArg(arguments[0], "$model");
        }
        {
            __processArg(arguments[0], "__itemTemplate");
        }
    }
    var $ = this;
    var exports = {};
    $.__views.windowActivity = Ti.UI.createWindow({
        backgroundColor: "#166181",
        id: "windowActivity"
    });
    $.__views.windowActivity && $.addTopLevelView($.__views.windowActivity);
    $.__views.Container = Ti.UI.createView({
        layout: "vertical",
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        id: "Container"
    });
    $.__views.windowActivity.add($.__views.Container);
    $.__views.Time = Ti.UI.createView({
        width: "40%",
        layout: "horizontal",
        font: {
            fontSize: 24
        },
        top: 20,
        height: Titanium.UI.SIZE,
        left: "30%",
        backgroundColor: "#FFFFFF",
        borderColor: "#FFFFFF",
        borderRadius: 15,
        id: "Time"
    });
    $.__views.Container.add($.__views.Time);
    $.__views.Hour = Ti.UI.createLabel({
        color: "#166181",
        font: {
            fontSize: 24
        },
        left: "2%",
        id: "Hour",
        text: "00"
    });
    $.__views.Time.add($.__views.Hour);
    $.__views.__alloyId0 = Ti.UI.createLabel({
        color: "#166181",
        font: {
            fontSize: 24
        },
        left: "2%",
        text: ":",
        id: "__alloyId0"
    });
    $.__views.Time.add($.__views.__alloyId0);
    $.__views.Minute = Ti.UI.createLabel({
        color: "#166181",
        font: {
            fontSize: 24
        },
        left: "2%",
        id: "Minute",
        text: "00"
    });
    $.__views.Time.add($.__views.Minute);
    $.__views.__alloyId1 = Ti.UI.createLabel({
        color: "#166181",
        font: {
            fontSize: 24
        },
        left: "2%",
        text: ":",
        id: "__alloyId1"
    });
    $.__views.Time.add($.__views.__alloyId1);
    $.__views.Second = Ti.UI.createLabel({
        color: "#166181",
        font: {
            fontSize: 24
        },
        left: "2%",
        id: "Second",
        text: "00"
    });
    $.__views.Time.add($.__views.Second);
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        style: Ti.UI.ActivityIndicatorStyle.DARK,
        indicatorColor: "Black",
        color: "Black",
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        id: "activityIndicator"
    });
    $.__views.Container.add($.__views.activityIndicator);
    $.__views.__alloyId2 = Ti.UI.createScrollView({
        id: "__alloyId2"
    });
    $.__views.Container.add($.__views.__alloyId2);
    $.__views.Sudoku = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        width: Titanium.UI.SIZE,
        id: "Sudoku"
    });
    $.__views.__alloyId2.add($.__views.Sudoku);
    $.__views.Options = Ti.UI.createView({
        width: Titanium.UI.FILL,
        id: "Options"
    });
    $.__views.Container.add($.__views.Options);
    $.__views.help = Ti.UI.createButton({
        top: 20,
        width: "40%",
        height: Titanium.UI.SIZE,
        left: "30%",
        backgroundColor: "#FFFFFF",
        borderColor: "#FFFFFF",
        borderRadius: 15,
        textAlign: "Center",
        id: "help",
        title: "AIDE"
    });
    $.__views.Options.add($.__views.help);
    exports.destroy = function() {};
    _.extend($, $.__views);
    style = Ti.UI.ActivityIndicatorStyle.DARK;
    $.activityIndicator.style = style;
    $.activityIndicator.show();
    var sudoku = InitTable();
    $.activityIndicator.hide();
    var width = Titanium.Platform.displayCaps.platformWidth;
    var height = .6 * Titanium.Platform.displayCaps.platformHeight;
    var tinyBorderHorizontal = .005 * height;
    var tinyBorderVertical = .005 * width;
    var row_height = .9 * height / 9;
    var cell_width = .9 * width / 9;
    var color_border = "#040430";
    var second_color = "#D9F1FE";
    var first_color = "#FFFFFF";
    var tableData = [];
    var table = Ti.UI.createTableView({
        separatorStyle: 0,
        width: Ti.UI.FILL
    });
    var number_line = sudoku.length - 1;
    for (var i = 0; number_line > i; i++) {
        var row = Ti.UI.createTableViewRow({
            className: "row",
            objName: "row_" + i,
            textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
            layout: "vertical",
            height: row_height
        });
        var LineSudokuView = Ti.UI.createView({
            backgroundColor: "#FFFFFF",
            objName: "horizontalView",
            rowID: i,
            height: Ti.UI.FILL,
            layout: "horizontal",
            width: Ti.UI.FILL
        });
        if (sudoku[i]) {
            number_column = sudoku[i].length;
            for (var j = 0; number_column > j; j++) {
                var random = Math.floor(1e3 * Math.random());
                if ((Math.floor(j / 3) + 3 * Math.floor(i / 3)) % 2 === 0) var color = first_color; else var color = second_color;
                var hide = random % 3 == 0 || random % 5 == 0 || random % 7 == 0 || random % 13 == 0 || random % 17 == 0 || random % 19 == 0 || random % 23 == 0 || random % 29 == 0;
                if (hide) var textField = Ti.UI.createTextField({
                    keyboardType: Titanium.UI.KEYBOARD_NUMBER_PAD
                }); else var textField = Ti.UI.createTextField({
                    value: sudoku[i][j],
                    touchEnabled: false,
                    editable: false,
                    keyboardType: Titanium.UI.KEYBOARD_NUMBER_PAD
                });
                textField.height = row_height;
                textField.width = cell_width;
                textField.textAlign = Titanium.UI.TEXT_ALIGNMENT_CENTER;
                textField.backgroundColor = color;
                textField.focusable = true;
                LineSudokuView.add(textField);
                if (8 > j) {
                    var VerticalBorder = Ti.UI.createView({
                        backgroundColor: color_border,
                        width: tinyBorderVertical,
                        top: 0,
                        bottom: 0,
                        right: 0,
                        height: Ti.UI.FILL
                    });
                    LineSudokuView.add(VerticalBorder);
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
    $.Sudoku.add(table);
    setInterval(function() {
        $.Second.text++;
        $.Second.text > 0 && $.Second.text < 10 && ($.Second.text = "0" + $.Second.text);
        if ($.Second.text % 60 == 0) {
            $.Minute.text++;
            $.Minute.text > 0 && $.Minute.text < 10 && ($.Minute.text = "0" + $.Minute.text);
            $.Second.text = 0;
            if ($.Minute.text % 60 == 0) {
                $.Hour.text++;
                $.Minute.text = 0;
                $.Hour.text > 0 && $.Hour.text < 10 && ($.Hour.text = "0" + $.Hour.text);
            }
        }
    }, 1e3);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;