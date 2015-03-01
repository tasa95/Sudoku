function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function isIOS_Seven_Plus() {
        return false;
    }
    function goToSudoku(sudoku) {
        var tableSudokuController = Alloy.createController("tableSudoku", {
            table: sudoku
        });
        tableSudokuController.getView().open();
        tableSudokuController.getView().addEventListener("new_game", function() {
            $.windowActivity.fireEvent("new_game", {
                retour: 0
            });
        });
        tableSudokuController.getView().addEventListener("quitGame", function() {
            $.windowActivity.close();
        });
        $.windowActivity.hide();
    }
    function VerificationIntegritySudoku(sudoku) {
        var integrity = true;
        var i = 0;
        var j = 0;
        while (integrity && i != sudoku.length) {
            Ti.API.debug("|");
            while (integrity && j != sudoku[i].length) {
                if ("undefined" == typeof sudoku[i][j] || "" == sudoku[i][j]) {
                    integrity = false;
                    Ti.API.debug("_");
                } else Ti.API.debug(sudoku[i][j]);
                j++;
            }
            j = 0;
            i++;
        }
        return integrity;
    }
    function InitTable() {
        var table = [];
        for (var i = 0; 9 > i; i++) {
            table[i] = [];
            for (var j = 0; 9 > j; j++) table[i][j] = j + 1;
        }
        return sortTable(table);
    }
    function setProb(sector, column, values) {
        var tableTry = [];
        Array.isArray(column) || (column = []);
        Array.isArray(sector) || (sector = []);
        for (var i = 0; i < values.length; i++) -1 == column.indexOf(values[i]) && -1 == sector.indexOf(values[i]) && tableTry.push(values[i]);
        if (0 == tableTry.length) {
            Ti.API.debug("table lot = 0");
            Ti.API.debug("values add = " + values);
        }
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
        if (9 == tableIndex_check.length) return -1;
        if (9 != numberOfUniqueProb) return index;
        for (var i = 0; i < ListOfListOfValues.length; i++) if (-1 == tableIndex_check.indexOf(i)) return i;
    }
    function AffichageInConsole(tableSudoku) {
        var string = "";
        for (var i = 0; 9 > i; i++) {
            string += "\n|";
            for (var j = 0; 9 > j; j++) string += "undefined" != typeof tableSudoku && "undefined" != typeof tableSudoku[i] && tableSudoku[i][j] && Array.isArray(tableSudoku[i]) ? tableSudoku[i][j] : "_";
            string += "|\n";
        }
        Ti.API.debug("tableau " + string);
    }
    function getValues(i, probTableSudoku, index) {
        var table_number = [];
        var compteur = [];
        if (probTableSudoku[index].length > 1) {
            for (var y = 0; y < probTableSudoku.length; y++) for (var x = 0; x < probTableSudoku[y].length; x++) index != y && table_number.push(probTableSudoku[y][x]);
            for (var x = 0; x < probTableSudoku.length; x++) for (var y = 0; y < probTableSudoku[x].length; y++) if (index != x) {
                compteur[probTableSudoku[x][y]] && "undefined" != typeof compteur[probTableSudoku[x][y]] || (compteur[probTableSudoku[x][y]] = 0);
                compteur[probTableSudoku[x][y]]++;
            }
            var less = 100;
            var tab_value = [];
            Ti.API.debug("index = " + index);
            for (var y = 1; y < compteur.length; y++) if (compteur[y] < less) {
                if (-1 !== probTableSudoku[index].indexOf(y)) {
                    tab_value = [];
                    tab_value.push(y);
                    less = compteur[y];
                }
            } else compteur[y] == less && -1 !== probTableSudoku[index].indexOf(y) && tab_value.push(y);
            return tab_value;
        }
        Ti.API.debug("index = " + index);
        Ti.API.debug("value = " + probTableSudoku[index][0]);
        Ti.API.debug("value = " + probTableSudoku[index]);
        return probTableSudoku[index];
    }
    function insertInSudoku(i, index, tableSudoku, probTableSudoku, tableColumn, tableSector, table) {
        tableSudoku[i][index] = setRandom(probTableSudoku[i].length > 1 ? getValues(i, probTableSudoku[i], index) : probTableSudoku[i]);
        "undefined" != typeof tableColumn[index] && tableColumn[index] && Array.isArray(tableColumn[index]) || (tableColumn[index] = []);
        "undefined" != typeof tableSector[Math.floor(index / 3) + 3 * Math.floor(i / 3)] && tableSector[Math.floor(index / 3) + Math.floor(i / 3)] && Array.isArray(tableSector[Math.floor(index / 3) + Math.floor(i / 3)]) || (tableSector[Math.floor(index / 3) + 3 * Math.floor(i / 3)] = []);
        tableColumn[index].push(tableSudoku[i][index]);
        tableSector[Math.floor(index / 3) + 3 * Math.floor(i / 3)].push(tableSudoku[i][index]);
        table[i] = table[i].filter(function(element) {
            return element != tableSudoku[i][index];
        });
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
                    Ti.API.debug("tabColumn = " + j);
                }
                if (!tableSector[Math.floor(j / 3) + 3 * Math.floor(i / 3)]) {
                    tableSector[Math.floor(j / 3) + 3 * Math.floor(i / 3)] = [];
                    Ti.API.debug("tabSector = " + Math.floor(j / 3) + Math.floor(i / 3));
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
            if (-1 != index && -1 == tableIndex_check.indexOf(index)) {
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
        id: "Container"
    });
    $.__views.windowActivity.add($.__views.Container);
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        style: Ti.UI.ActivityIndicatorStyle.DARK,
        indicatorColor: "White",
        color: "Black",
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        id: "activityIndicator"
    });
    $.__views.Container.add($.__views.activityIndicator);
    exports.destroy = function() {};
    _.extend($, $.__views);
    style = Ti.UI.ActivityIndicatorStyle.DARK;
    $.activityIndicator.style = style;
    var iOS_seven = isIOS_Seven_Plus();
    var theTop = iOS_seven ? 20 : 0;
    var window = $.windowActivity;
    window.top = theTop;
    $.windowActivity.addEventListener("new_game", function(e) {
        $.windowActivity.show();
        $.activityIndicator.show();
        if (0 == e.retour) {
            var sudoku;
            do sudoku = InitTable(); while (false == VerificationIntegritySudoku(sudoku));
        }
        $.activityIndicator.hide();
        goToSudoku(sudoku);
    });
    $.windowActivity.addEventListener("quitGame", function() {
        Ti.App.removeEventListener("quitGame", function() {});
        Ti.App.removeEventListener("new_game", function() {});
        $.windowActivity.close();
    });
    $.windowActivity.fireEvent("new_game", {
        retour: 0
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;