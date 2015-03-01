function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function closeWindow() {
        $.detailWindow.close();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "detailScore";
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
    var __defers = {};
    $.__views.detailWindow = Ti.UI.createWindow({
        id: "detailWindow",
        backgroundColor: "#166181"
    });
    $.__views.detailWindow && $.addTopLevelView($.__views.detailWindow);
    $.__views.__alloyId4 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId4"
    });
    $.__views.detailWindow.add($.__views.__alloyId4);
    $.__views.labelScore = Ti.UI.createLabel({
        top: "15%",
        color: "white",
        font: {
            fontSize: 30
        },
        text: "Mon score",
        id: "labelScore"
    });
    $.__views.__alloyId4.add($.__views.labelScore);
    $.__views.valueScore = Ti.UI.createLabel({
        top: "15%",
        color: "white",
        font: {
            fontSize: 24
        },
        id: "valueScore"
    });
    $.__views.__alloyId4.add($.__views.valueScore);
    $.__views.Sudoku = Ti.UI.createView({
        id: "Sudoku"
    });
    $.__views.detailWindow.add($.__views.Sudoku);
    $.__views.buttonBack = Ti.UI.createButton({
        width: "90%",
        height: "10%",
        backgroundColor: "#FFFFFF",
        borderColor: "#FFFFFF",
        borderRadius: 15,
        textAlign: "Center",
        bottom: "5%",
        font: {
            fontSize: 18
        },
        title: "Retour",
        id: "buttonBack"
    });
    $.__views.detailWindow.add($.__views.buttonBack);
    closeWindow ? $.__views.buttonBack.addEventListener("click", closeWindow) : __defers["$.__views.buttonBack!click!closeWindow"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var row = args;
    $.valueScore.text = row.hour + "h" + row.minute + "m" + row.second + "s";
    $.detailWindow.hideNavBar();
    __defers["$.__views.buttonBack!click!closeWindow"] && $.__views.buttonBack.addEventListener("click", closeWindow);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;