const { Router } = require("express");
const peers = require("../controllers/peersController");

const router = Router();

router.get("/peers", peers);

module.exports = router;
