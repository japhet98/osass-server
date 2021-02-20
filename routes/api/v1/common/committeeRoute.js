module.exports = (app) => {
    const Committee = require("../../../../Controller/api/v1/common/committeeController");
    const Mdw = require("../../../../middleware/authMiddleware");

    app.post("/api/v1/common/committee", Mdw.AdminMiddleware, Committee.create);
    app.get("/api/v1/common/committee", Mdw.AuthMiddleware, Committee.getall);
    app.get("/api/v1/common/committee/:id", Mdw.AuthMiddleware, Committee.getone);
    app.put(
        "/api/v1/common/committee/:id",
        Mdw.AdminMiddleware,
        Committee.update
    );
    app.delete(
        "/api/v1/common/committee/:id",
        Mdw.AdminMiddleware,
        Committee.delete
    );
};