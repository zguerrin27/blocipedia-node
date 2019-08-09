const User = require("./models").User;
const bcrypt = require("bcryptjs");
const Collaborator = require('./models').Collaborator;

module.exports = {

  createUser(newUser, callback){
    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(newUser.password, salt);

    return User.create({
      username: newUser.username,
      email: newUser.email,
      password: hashedPassword
    })
    .then((user) => {
      callback(null, user);
    })
    .catch((err) => {
      callback(err);
    })
  },
  getUser(id, callback){
    let result = {};
    User.findById(id)
    .then((user) => {
      if(!user){
        callback(404);
      } else {
        result["user"] = user;
        Collaborator.scope({method: ["collaboratorFor", id]}).findAll()   //this was key in getting the collabs to work...
       .then((collaborator) => {
         result["collaborator"] = collaborator;       
        callback(null, result);
      })
      .catch((err) => {
        callback(err);
      })
     }
   })
  },
  upgrade(id){                   // role in db
    return User.findById(id)
    .then((user) => {
      if(!user) {
        return callback("User not found!");
      } else {
        return user.update({ role: "premium" });
      }
    })
    .catch(err => {
      console.log(err);
    });
  },
  downgrade(id){               // role in db
    return User.findById(id)
    .then((user) => {
      if(!user) {
        return callback("User not found!");
      } else {
        return user.update({ role: "standard" });
      }
    })
    .catch(err => {
      console.log(err);
    })
  }
  // ,
  // findAllCollab(id){
  //   return Wiki.findAll()
  //   .then((wikis) => {
  //     console.log(wiki)
  //     wikis.forEach((wiki) => {
  //       // if(wiki.userId === id && wiki.private === true){
  //       //   wiki.update({
  //       //     private: false
  //       //   })
  //       // }
  //     })
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   })
  // }

}