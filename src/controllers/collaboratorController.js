const collabQueries = require("../db/queries.collaborators.js");
const wikiQueries = require("../db/queries.wikis.js");
const Authorizer = require("../policies/collaborator");

module.exports = { 

  add(req, res, next){
    const authorized = new Authorizer(req.user).new();
    if(authorized){
      collabQueries.addCollaborator(req, (err, collaborator) => {
        if(err){
          console.log("FROM ADD ON COLLAB CONTROLLER")
          console.log(err)
          req.flash("error", err);
        }
      });
    } else {
      req.flash("notice", "You are not authorized to do that.");
      res.redirect("/");
    }
    res.redirect(req.headers.referer);
  }

}