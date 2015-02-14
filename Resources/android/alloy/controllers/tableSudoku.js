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
    function timer(addTime) {
        var left_over = 0;
        var second = parseInt($.Second.text, 10);
        var minute = parseInt($.Minute.text, 10);
        var hour = parseInt($.Hour.text, 10);
        addTime ? second += addTime : second++;
        if (second >= 60) {
            var left_over = second % 60;
            second = left_over;
            minute++;
            if (minute >= 60) {
                minute = 0;
                hour++;
            }
        }
        $.Second.text = second >= 0 && 10 > second ? "0" + second : second;
        $.Minute.text = minute >= 0 && 10 > minute ? "0" + minute : minute;
        hour >= 0 && 10 > hour ? $.Hour.text = "0" + hour : $.hour.text = hour;
    }
    function stopGame(refreshIntervalId) {
        clearInterval(refreshIntervalId);
    }
    function verify_valueElement(e) {
        var letters = /^[1-9]+$/;
        if (e.value != e.source.oldValue) if (e.value.match(letters)) {
            e.value = e.value % 10;
            e.source.oldValue = e.value;
            e.source.value = e.value;
        } else if ("" === e.value) {
            e.source.oldValue = e.value;
            e.source.value = e.value;
        } else e.source.value = "";
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "tableSudoku";
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
    $.__views.windowTable = Ti.UI.createWindow({
        backgroundColor: "#166181",
        id: "windowTable"
    });
    $.__views.windowTable && $.addTopLevelView($.__views.windowTable);
    $.__views.parent_view = Ti.UI.createView({
        layout: "vertical",
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        id: "parent_view"
    });
    $.__views.windowTable.add($.__views.parent_view);
    $.__views.Time = Ti.UI.createView({
        bottom: "6%",
        width: "40%",
        height: Titanium.UI.SIZE,
        layout: "horizontal",
        font: {
            fontSize: 24
        },
        backgroundColor: "#FFFFFF",
        borderColor: "#FFFFFF",
        borderRadius: 15,
        id: "Time"
    });
    $.__views.parent_view.add($.__views.Time);
    $.__views.Hour = Ti.UI.createLabel({
        color: "#166181",
        font: {
            fontSize: 24
        },
        left: "4%",
        id: "Hour",
        text: "00"
    });
    $.__views.Time.add($.__views.Hour);
    $.__views.__alloyId0 = Ti.UI.createLabel({
        color: "#166181",
        font: {
            fontSize: 24
        },
        left: "4%",
        text: ":",
        id: "__alloyId0"
    });
    $.__views.Time.add($.__views.__alloyId0);
    $.__views.Minute = Ti.UI.createLabel({
        color: "#166181",
        font: {
            fontSize: 24
        },
        left: "4%",
        id: "Minute",
        text: "00"
    });
    $.__views.Time.add($.__views.Minute);
    $.__views.__alloyId1 = Ti.UI.createLabel({
        color: "#166181",
        font: {
            fontSize: 24
        },
        left: "4%",
        text: ":",
        id: "__alloyId1"
    });
    $.__views.Time.add($.__views.__alloyId1);
    $.__views.Second = Ti.UI.createLabel({
        color: "#166181",
        font: {
            fontSize: 24
        },
        left: "4%",
        id: "Second",
        text: "00"
    });
    $.__views.Time.add($.__views.Second);
    $.__views.Sudoku = Ti.UI.createView({
        bottom: "6%",
        height: Titanium.UI.SIZE,
        width: Titanium.UI.FILL,
        layout: "horizontal",
        backgroundColor: "#FFFFFF",
        id: "Sudoku"
    });
    $.__views.parent_view.add($.__views.Sudoku);
    $.__views.Options = Ti.UI.createView({
        bottom: "6%",
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        id: "Options"
    });
    $.__views.parent_view.add($.__views.Options);
    $.__views.help = Ti.UI.createButton({
        width: "40%",
        height: Titanium.UI.SIZE,
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
    var args = arguments[0];
    var sudoku = [];
    var sudoku = args.table;
    var width = Titanium.Platform.displayCaps.platformWidth;
    var height = .6 * Titanium.Platform.displayCaps.platformHeight;
    var tinyBorderHorizontal = .005 * height;
    var tinyBorderVertical = .005 * width;
    var row_height = .94 * height / 9;
    var cell_width = .94 * width / 9;
    var color_border = "#040430";
    var second_color = "#D9F1FE";
    var first_color = "#FFFFFF";
    var tableData = [];
    var table = Ti.UI.createTableView({
        separatorStyle: 0,
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        bottom: "2%",
        moveable: false,
        moving: false,
        scrollable: false
    });
    var number_line = sudoku.length - 1;
    var empty_cells = 0;
    var listTextfield = [];
    for (var i = 0; number_line > i; i++) {
        var row = Ti.UI.createTableViewRow({
            className: "row",
            objName: "row_" + i,
            textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
            layout: "vertical",
            height: row_height,
            moveable: false,
            moving: false,
            scrollable: false,
            focusable: false,
            editable: false,
            touchEnabled: false,
            allowsSelection: false
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
                var hide = random % 5 == 0 || random % 7 == 0 || random % 13 == 0 || random % 17 == 0 || random % 19 == 0 || random % 23 == 0 || random % 29 == 0;
                if (hide) {
                    var textField = Ti.UI.createTextField({
                        keyboardType: Titanium.UI.KEYBOARD_NUMBER_PAD,
                        value: "",
                        id: "textField_" + i + "_" + j
                    });
                    empty_cells++;
                    textField.returnKeyType = Titanium.UI.RETURNKEY_DONE;
                } else var textField = Ti.UI.createTextField({
                    value: sudoku[i][j],
                    touchEnabled: false,
                    editable: false,
                    keyboardType: Titanium.UI.KEYBOARD_NUMBER_PAD,
                    id: "textField_" + i + "_" + j
                });
                textField.height = row_height;
                textField.width = cell_width;
                textField.textAlign = Titanium.UI.TEXT_ALIGNMENT_CENTER;
                textField.backgroundColor = color;
                textField.focusable = true;
                listTextfield[j + 9 * i] = textField;
                textField.addEventListener("change", function(e) {
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
                            timer(30);
                        }
                        Ti.API.info("empty_cells= " + empty_cells);
                        0 == empty_cells && stopGame(refreshId);
                        this.blur();
                    }
                });
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
    }
    var HorizontalBorder = Ti.UI.createView({
        backgroundColor: color_border,
        width: Ti.UI.FILL,
        top: 0,
        bottom: 0,
        right: 0,
        height: tinyBorderHorizontal
    });
    row.add(HorizontalBorder);
    table.setData(tableData);
    $.Sudoku.add(table);
    refreshId = setInterval(timer, 1e3);
    $.windowTable.addEventListener("click", function() {
        for (var index = 0; index < listTextfield.length; index++) listTextfield[index].blur();
    });
    var iOS_seven = isIOS_Seven_Plus();
    var theTop = iOS_seven ? 20 : 0;
    var window = $.windowTable;
    window.top = theTop;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;