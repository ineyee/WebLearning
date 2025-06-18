const KoaRouter = require("@koa/router");
const { verifyToken } = require("../../middleware/user/user.middleware");
const {
  verifyMomentParams,
} = require("../../middleware/moment/moment.middleware");
const momentController = require("../../controller/moment/moment.controller");

const router = new KoaRouter({
  prefix: "/moment",
});

router.post(
  "/createMoment",
  verifyToken,
  verifyMomentParams,
  momentController.createMoment
);

module.exports = router;
