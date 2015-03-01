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
    function goToStat() {
        var scores = Alloy.createController("statistic").getView();
        $.navGroup.openWindow(scores);
    }
    function goToAbout() {
        var scores = Alloy.createController("about").getView();
        $.navGroup.openWindow(scores);
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
    $.__views.mainWindow = Ti.UI.createWindow({
        backgroundColor: "#166181",
        id: "mainWindow"
    });
    $.__views.CentralView = Ti.UI.createView({
        width: "100%",
        layout: "vertical",
        id: "CentralView"
    });
    $.__views.mainWindow.add($.__views.CentralView);
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
    $.__views.__alloyId4 = Ti.UI.createButton({
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
        id: "__alloyId4"
    });
    $.__views.CenterLabel.add($.__views.__alloyId4);
    goToCreationOfSudoku ? $.__views.__alloyId4.addEventListener("click", goToCreationOfSudoku) : __defers["$.__views.__alloyId4!click!goToCreationOfSudoku"] = true;
    $.__views.__alloyId5 = Ti.UI.createButton({
        backgroundColor: "#FFFFFF",
        borderColor: "#FFFFFF",
        borderRadius: 15,
        textAlign: "Center",
        height: Titanium.UI.SIZE,
        width: "80%",
        left: "10%",
        color: "#166181",
        top: 20,
        title: "Statistiques",
        id: "__alloyId5"
    });
    $.__views.CenterLabel.add($.__views.__alloyId5);
    goToStat ? $.__views.__alloyId5.addEventListener("click", goToStat) : __defers["$.__views.__alloyId5!click!goToStat"] = true;
    $.__views.__alloyId6 = Ti.UI.createButton({
        backgroundColor: "#FFFFFF",
        borderColor: "#FFFFFF",
        borderRadius: 15,
        textAlign: "Center",
        height: Titanium.UI.SIZE,
        width: "80%",
        left: "10%",
        color: "#166181",
        top: 20,
        title: "À propos",
        id: "__alloyId6"
    });
    $.__views.CenterLabel.add($.__views.__alloyId6);
    goToAbout ? $.__views.__alloyId6.addEventListener("click", goToAbout) : __defers["$.__views.__alloyId6!click!goToAbout"] = true;
    $.__views.navGroup = Ti.UI.iOS.createNavigationWindow({
        window: $.__views.mainWindow,
        id: "navGroup"
    });
    $.__views.navGroup && $.addTopLevelView($.__views.navGroup);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.mainWindow.hideNavBar();
    $.navGroup.open();
    __defers["$.__views.__alloyId4!click!goToCreationOfSudoku"] && $.__views.__alloyId4.addEventListener("click", goToCreationOfSudoku);
    __defers["$.__views.__alloyId5!click!goToStat"] && $.__views.__alloyId5.addEventListener("click", goToStat);
    __defers["$.__views.__alloyId6!click!goToAbout"] && $.__views.__alloyId6.addEventListener("click", goToAbout);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;