module.exports = (app) => {
    const auth = require("../../../../Controller/api/v1/common/authController");
    const Mdw = require("../../../../middleware/authMiddleware");

    app.post("/api/v1/common/auth", auth.login);
    app.get("/api/v1/common/auth", Mdw.AuthMiddleware, auth.getuser);
};