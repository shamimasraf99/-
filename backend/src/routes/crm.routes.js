const controller = require("../controllers/crm.controller");
const { authJwt } = require("../middleware");

module.exports = function(app) {
    app.get("/api/leads", [authJwt.verifyToken], controller.getAllLeads);
};
