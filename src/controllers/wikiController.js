const wikiQueries = require("../db/queries.wikis.js");
const Authorizer = require("../policies/wiki");
const markdown = require("markdown").markdown;



module.exports = {

  index(req, res, next){
    wikiQueries.getAllWikis((err, wikis) => {
      if(err){
        res.redirect(500, "static/index");
      } else {
        res.render("wikis/wiki", {wikis});
      }
    })
  },
  new(req, res, next){
    const authorized = new Authorizer(req.user).new();
    if(authorized) {
      res.render("wikis/new");
    } else {
      req.flash("notice", "You are not authorized to do that. Please create a user or login to continue.");
      res.redirect("/wikis");
    }
  },
  create(req, res, next){
    const authorized = new Authorizer(req.user).create();
    if(authorized) {
    let newWiki = {
      title: req.body.title,
      body: req.body.body,
      private: req.body.private,
      userId: req.user.id
    };
    wikiQueries.addWiki(newWiki, (err, wiki) => {
      if(err){
        console.log(err)
        res.redirect(500, "/wikis/new");
      } else {
        res.redirect(303, `/wikis/${wiki.id}`);
      }
    });
  } else {
      req.flash("notice", "You are not authorized to do that. Please create a user or login to continue.");
      res.redirect("/wikis");
     }
  },
  show(req, res, next){
    wikiQueries.getWiki(req.params.id, (err, wiki) => {
      if(err || wiki == null){
        res.redirect(404, "/");
      } else {
        let content = markdown.toHTML(wiki.body);
        res.render("wikis/show", {wiki, content});  //, collaborator
      }
    });
  },
  destroy(req, res, next){
    const authorized = new Authorizer(req.user).destroy();
    if(authorized){
    wikiQueries.deleteWiki(req.params.id, (err, wiki) => {
      if(err){
        res.redirect(500, `/wikis/${wiki.id}`)
      } else {
        res.redirect(303, "/wikis")
      }
    });
    } else {
      req.flash("notice", "You are not authorized to do that.")
      res.redirect(`/wikis/${req.params.id}`)
    }
  },
  edit(req, res, next){
    wikiQueries.getWiki(req.params.id, (err, wiki) => {
      if(err || wiki == null){
        res.redirect(404, "/");
      } else {
        const authorized = new Authorizer(req.user, wiki).edit();
        if(authorized){
        res.render("wikis/edit", {wiki});   //, collaborator
      } else {
        req.flash("notice", "You are not authorized to do that.")
        res.redirect(`/wikis/${req.params.id}`)
        }
      }
    });
  },
  update(req, res, next){
    wikiQueries.updateWiki(req.params.id, req.body, (err, wiki) => {
      if(err || wiki == null){
        res.redirect(404, `/wikis/${req.params.id}/edit`);
      } else {
        res.redirect(`/wikis/${wiki.id}`);
      }
    });
  }
  //,
  // private(req, res, next){
  //   wikiQueries.getAllPrivateWikis((err, wikis) => {
  //     if(err){
  //       res.redirect(500, "static/index");
  //     } else {
  //       res.render("wikis/private", {wikis});
  //     }
  //   })
  // }

}