const express = require("express");
const router = express.Router();
const collaboratorController = require("../controllers/collaboratorController");
const validation = require("./validation");

router.post("/wikis/:wikiId/collaborator/add", collaboratorController.add);
router.post("/wikis/:wikiId/collaborator/destroy", collaboratorController.destroy);


module.exports = router;