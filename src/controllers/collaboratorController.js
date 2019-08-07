const collabQueries = require("../db/queries.collaborators.js");
const wikiQueries = require("../db/queries.wikis.js");
const Authorizer = require("../policies/collaborator");

module.exports = { 

  add(req, res, next){
    const authorized = new Authorizer(req.user).new();
    if(authorized){
      collabQueries.addCollaborator(req, (err, collaborator) => {
        if(err){
          // req.flash("error", err);
          req.flash("notice", "That cannot be done");
          console.log(err)
        }
      });
    } else {
      req.flash("notice", "You are not authorized to do that.");
      // res.redirect(req.headers.referer);
    }
    res.redirect(req.headers.referer);
  },

  destroy(req, res, next){
    const authorized = new Authorizer(req.user).destroy();
    if(authorized){
      collabQueries.remove(req, (err, collaborator) => {
        if(err){
          req.flash("error", err);
        }
        res.redirect(req.headers.referer);
      });
    } else {
      req.flash("notice", "You must be signed in to do that.");
      res.redirect(req.headers.referer);
    }
  }

}