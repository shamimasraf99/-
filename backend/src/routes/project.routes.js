const controller = require("../controllers/project.controller");
const { authJwt } = require("../middleware");

module.exports = function(app) {
    app.get("/api/projects", [authJwt.verifyToken], controller.getAllProjects);
};
