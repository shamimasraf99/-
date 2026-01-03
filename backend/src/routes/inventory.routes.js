const controller = require("../controllers/inventory.controller");
const { authJwt } = require("../middleware");

module.exports = function(app) {
    app.get("/api/inventory", [authJwt.verifyToken], controller.getAllInventory);
};
