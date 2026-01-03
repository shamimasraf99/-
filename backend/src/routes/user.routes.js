const controller = require("../controllers/user.controller");
const { authJwt } = require("../middleware");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Authorization, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/users", [authJwt.verifyToken, authJwt.isAdmin], controller.getAllUsers);
    app.post("/api/users", [authJwt.verifyToken, authJwt.isAdmin], controller.createUser);
    app.put("/api/users/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.updateUser);
};
