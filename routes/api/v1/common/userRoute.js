module.exports = (app) => {
    const user = require("../../../../Controller/api/v1/common/userController");
    const Mdw = require("../../../../middleware/authMiddleware");

    app.post("/api/v1/common/users", user.register);
    app.get("/api/v1/common/users", Mdw.AdminMiddleware, user.getall);
    app.get("/api/v1/common/users/:id", Mdw.AdminMiddleware, user.getone);
    app.put("/api/v1/common/users/:id", Mdw.AuthMiddleware, user.update);
    app.delete("/api/v1/common/users/:id", Mdw.AdminMiddleware, user.delete);
};