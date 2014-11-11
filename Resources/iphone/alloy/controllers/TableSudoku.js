function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "TableSudoku";
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
    $.__views.TableSudoku = Ti.UI.createWindow({
        layout: "vertical",
        id: "TableSudoku"
    });
    $.__views.TableSudoku && $.addTopLevelView($.__views.TableSudoku);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var width = Titanium.Platform.displayCaps.platformWidth;
    var height = .6 * Titanium.Platform.displayCaps.platformHeight;
    var tinyBorderHorizontal = .005 * height;
    var tinyBorderVertical = .005 * width;
    var row_height = .9 * height / 9;
    var cell_width = .9 * width / 9;
    var color_border = "#040430";
    var second_color = "#D9F1FE";
    var first_color = "#FFFFFF";
    var sudoku = arguments[0] || {};
    var tableData = [];
    var table = Ti.UI.createTableView({});
    var number_line = sudoku.length - 1;
    for (var i = 0; number_line > i; i++) {
        var row = Ti.UI.createTableViewRow({
            className: "row",
            objName: "row_" + i,
            textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
            layout: "vertical",
            backgroundColor: $.TableSudoku.backgroundColor,
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
                if (hide) var textField = Ti.UI.createTextField({}); else var textField = Ti.UI.createTextField({
                    value: sudoku[i][j],
                    touchEnabled: true,
                    editable: true
                });
                textField.height = row_height;
                textField.width = cell_width;
                textField.textAlign = Titanium.UI.TEXT_ALIGNMENT_CENTER;
                textField.backgroundColor = color;
                textField.focusable = true;
                textField.addEventListener("change", function(e) {
                    var letters = /^[0-9,]+$/;
                    e.value.match(letters) ? e.source.oldValue = e.value : e.source.value = e.source.oldValue;
                });
                LineSudokuView.add(textField);
                if (8 > j) {
                    Ti.UI.createView({
                        backgroundColor: color_border,
                        width: tinyBorderVertical,
                        top: 0,
                        bottom: 0,
                        right: 0,
                        height: Ti.UI.FILL
                    });
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
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;