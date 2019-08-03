const User = require('./models').User;
const Wiki = require('./models').Wiki;
const Collaborator = require('./models').Collaborator;


module.exports = {


  addCollaborator(req, callback){
    // console.log(req.user)
    if (req.user.email === req.body.collaborator){
      return callback("You can't collaborate on your own Wiki!");
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
  }


}