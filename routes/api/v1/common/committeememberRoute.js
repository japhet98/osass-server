module.exports = (app) => {
    const Committeemember = require("../../../../Controller/api/v1/common/committeememberController");
    const Mdw = require("../../../../middleware/authMiddleware");

    app.post(
        "/api/v1/common/committeemember",
        Mdw.AdminMiddleware,
        Committeemember.create
    );
    app.get(
        "/api/v1/common/committeemember",
        Mdw.AuthMiddleware,
        Committeemember.getall
    );
    app.get(
        "/api/v1/common/committeemember/:id",
        Mdw.AuthMiddleware,
        Committeemember.getone
    );
    app.get(
        "/api/v1/common/committeemember/committee",
        Mdw.AuthMiddleware,
        Committeemember.getcommitteejoined
    );
    app.put(
        "/api/v1/common/committeemember/:id",
        Mdw.AdminMiddleware,
        Committeemember.update
    );
    app.delete(
        "/api/v1/common/committeemember/:id",
        Mdw.AdminMiddleware,
        Committeemember.delete
    );

    app.put(
        "/api/v1/common/committeemember/response/:id",
        Mdw.AuthMiddleware,
        Committeemember.respondAppointment
    );
};