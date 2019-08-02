const express = require("express");
const router = express.Router();
const collaboratorController = require("../controllers/collaboratorController");
const validation = require("./validation.js");

router.post("/wikis/:wikiId/collaborators/add", collaboratorController.add);
router.post("/wikis/:wikiId/collaborators/destroy", collaboratorController.destroy);

module.exports = router;