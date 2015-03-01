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
        $.QuitGame.close();
    }
    function quitGame() {
        $.QuitGame.close();
        $.QuitGame.fireEvent("exit", {
            retour: 0
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "QuitGame";
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
    $.__views.QuitGame = Ti.UI.createWindow({
        id: "QuitGame"
    });
    $.__views.QuitGame && $.addTopLevelView($.__views.QuitGame);
    $.__views.__alloyId0 = Ti.UI.createView({
        backgroundColor: "#FFF",
        opacity: .9,
        id: "__alloyId0"
    });
    $.__views.QuitGame.add($.__views.__alloyId0);
    $.__views.__alloyId1 = Ti.UI.createView({
        layout: "vertical",
        backgroundColor: "#FFF",
        opacity: 1,
        width: 250,
        height: 400,
        id: "__alloyId1"
    });
    $.__views.__alloyId0.add($.__views.__alloyId1);
    $.__views.generateNewGame = Ti.UI.createLabel({
        height: 100,
        width: 250,
        textAlign: "center",
        opacity: 1,
        id: "generateNewGame",
        text: "Voulez vous quittez le jeu"
    });
    $.__views.__alloyId1.add($.__views.generateNewGame);
    $.__views.__alloyId2 = Ti.UI.createView({
        layout: "horizontal",
        height: 200,
        opacity: 1,
        width: "100%",
        id: "__alloyId2"
    });
    $.__views.__alloyId1.add($.__views.__alloyId2);
    $.__views.buttonNo = Ti.UI.createButton({
        height: 100,
        width: "30%",
        top: 50,
        borderRadius: 10,
        opacity: 1,
        backgroundColor: "#ED0D27",
        left: "5%",
        id: "buttonNo",
        title: "Non"
    });
    $.__views.__alloyId2.add($.__views.buttonNo);
    closeWindow ? $.__views.buttonNo.addEventListener("click", closeWindow) : __defers["$.__views.buttonNo!click!closeWindow"] = true;
    $.__views.buttonOui = Ti.UI.createButton({
        height: 100,
        width: "30%",
        top: 50,
        borderRadius: 10,
        opacity: 1,
        backgroundColor: "#07E937",
        left: "30%",
        id: "buttonOui",
        title: "Oui"
    });
    $.__views.__alloyId2.add($.__views.buttonOui);
    quitGame ? $.__views.buttonOui.addEventListener("click", quitGame) : __defers["$.__views.buttonOui!click!quitGame"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    __defers["$.__views.buttonNo!click!closeWindow"] && $.__views.buttonNo.addEventListener("click", closeWindow);
    __defers["$.__views.buttonOui!click!quitGame"] && $.__views.buttonOui.addEventListener("click", quitGame);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;