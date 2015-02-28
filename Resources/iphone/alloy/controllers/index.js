function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function goToCreationOfSudoku() {
        var c = Alloy.createController("CreationSudoku", {});
        c.getView().open();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
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
    $.__views.index = Ti.UI.createWindow({
        backgroundColor: "#166181",
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    $.__views.CentralView = Ti.UI.createView({
        width: "100%",
        layout: "vertical",
        id: "CentralView"
    });
    $.__views.index.add($.__views.CentralView);
    $.__views.CenterLabel = Ti.UI.createView({
        layout: "horizontal",
        id: "CenterLabel"
    });
    $.__views.CentralView.add($.__views.CenterLabel);
    $.__views.imageSudoku = Ti.UI.createImageView({
        top: "15%",
        id: "imageSudoku",
        image: "Sudoku.png"
    });
    $.__views.CenterLabel.add($.__views.imageSudoku);
    $.__views.__alloyId3 = Ti.UI.createButton({
        backgroundColor: "#FFFFFF",
        borderColor: "#FFFFFF",
        borderRadius: 15,
        textAlign: "Center",
        height: Titanium.UI.SIZE,
        width: "80%",
        left: "10%",
        color: "#166181",
        top: 20,
        title: "Jouer",
        id: "__alloyId3"
    });
    $.__views.CenterLabel.add($.__views.__alloyId3);
    goToCreationOfSudoku ? $.__views.__alloyId3.addEventListener("click", goToCreationOfSudoku) : __defers["$.__views.__alloyId3!click!goToCreationOfSudoku"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.index.open();
    __defers["$.__views.__alloyId3!click!goToCreationOfSudoku"] && $.__views.__alloyId3.addEventListener("click", goToCreationOfSudoku);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;