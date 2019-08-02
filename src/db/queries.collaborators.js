const User = require('./models').User;
const Wiki = require('./models').Wiki;
const Collaborator = require('./models').Collaborator;


const Authorizer = require("../policies/application");

module.exports = {

  addCollaborator(req, callback){
    if (req.user.name === req.body.collaborator){
      return callback("You're the owner - you can't be a collaborator!");
    }
    User.findAll({
      where: {
        email: req.body.collaborator
      }
    })
    .then((users) => {
      if(!users){
        return callback("User not found.");
      }
      Collaborator.findAll({
        where: {
          userId: users[0].id,
          wikiId: req.params.wikiId,
        }
      })
      .then((collaborators)=>{
        if(collaborators.length > 0){
          return callback('That user is already a collaborator.');
        }
        let newCollaborator = {
          userId: users[0].id,
          wikiId: req.params.wikiId
        };
        return Collaborator.create(newCollaborator)
        .then((collaborator) => {
          callback(null, collaborator);
        })
        .catch((err) => {
          callback(err, null);
        })
      })
      .catch((err)=>{
        callback(err, null);
      })
    })
    .catch((err)=>{
      callback(err, null);
    })
  },

  remove(req, callback){
    // current collaborator and wiki
    const collaborator = req.body.collaborator;
    let wikiId = req.params.wikiId;

    // check auth to destroy collaborator (premium, owner, admin)
    const authorized = new Authorizer(req.user, wiki, collaborator).destroy();

    if(authorized){
      Collaborator.destroy({ where: {
        userId : collaborator,
        wikiId : wikiId
      }})
      .then((deletedRecordsCount) => {
        callback(null, deletedRecordsCount);
      })
      .catch((err) => {
        callback(err);
      });
    } else {
      req.flash("notice", "You are not authorized to do that.")
      callback(401);
    }
  }

}