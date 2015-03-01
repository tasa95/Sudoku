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
        $.aboutWindow.close();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "about";
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
    $.__views.aboutWindow = Ti.UI.createWindow({
        backgroundColor: "#166181",
        id: "aboutWindow"
    });
    $.__views.aboutWindow && $.addTopLevelView($.__views.aboutWindow);
    $.__views.__alloyId3 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId3"
    });
    $.__views.aboutWindow.add($.__views.__alloyId3);
    $.__views.aboutLabel = Ti.UI.createLabel({
        top: "15%",
        color: "white",
        font: {
            fontSize: 30
        },
        id: "aboutLabel",
        text: "À propos"
    });
    $.__views.__alloyId3.add($.__views.aboutLabel);
    $.__views.textAbout = Ti.UI.createLabel({
        width: "80%",
        height: Titanium.UI.SIZE,
        color: "white",
        backgroundColor: "#166181",
        font: {
            fontSize: 12
        },
        top: "1%",
        id: "textAbout",
        text: "Cette application a été réalisé dans le cadre d'un projet scolaire, elle a été développé par:\nThierry ALLARD SAINT ALBIN et Thomas OUK."
    });
    $.__views.__alloyId3.add($.__views.textAbout);
    $.__views.buttonBackAbout = Ti.UI.createButton({
        width: "80%",
        height: "5%",
        backgroundColor: "#FFFFFF",
        borderColor: "#FFFFFF",
        borderRadius: 15,
        textAlign: "Center",
        top: "30%",
        font: {
            fontSize: 18
        },
        color: "#166181",
        title: "Retour",
        id: "buttonBackAbout"
    });
    $.__views.__alloyId3.add($.__views.buttonBackAbout);
    closeWindow ? $.__views.buttonBackAbout.addEventListener("click", closeWindow) : __defers["$.__views.buttonBackAbout!click!closeWindow"] = true;
    $.__views.__alloyId4 = Ti.UI.createView({
        layout: "horizontal",
        id: "__alloyId4"
    });
    $.__views.__alloyId3.add($.__views.__alloyId4);
    $.__views.bottomLabel = Ti.UI.createView({
        top: "5%",
        width: "50%",
        height: Titanium.UI.SIZE,
        id: "bottomLabel",
        layout: "vertical"
    });
    $.__views.__alloyId4.add($.__views.bottomLabel);
    $.__views.copyrightAbout = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        color: "white",
        font: {
            fontSize: 12
        },
        text: "© 2014-2015 4IAM",
        id: "copyrightAbout"
    });
    $.__views.bottomLabel.add($.__views.copyrightAbout);
    $.__views.versionLabel = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        color: "white",
        font: {
            fontSize: 12
        },
        text: "Version: 1.0",
        id: "versionLabel"
    });
    $.__views.bottomLabel.add($.__views.versionLabel);
    $.__views.logoImage = Ti.UI.createImageView({
        width: "30%",
        height: "50%",
        id: "logoImage",
        image: "esgi.png"
    });
    $.__views.__alloyId4.add($.__views.logoImage);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    $.aboutWindow.hideNavBar();
    __defers["$.__views.buttonBackAbout!click!closeWindow"] && $.__views.buttonBackAbout.addEventListener("click", closeWindow);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;