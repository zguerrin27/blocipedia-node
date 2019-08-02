const Wiki = require("./models").Wiki;
const Collaborator = require("./models").Collaborator;

module.exports = {

  getAllWikis(callback){
    return Wiki.findAll()
    .then((wikis) => {
      callback(null, wikis);
    })
    .catch((err) => {
      callback(err);
    })
  },
  addWiki(newWiki, callback){
    return Wiki.create(newWiki)    // newWiki comes from wikiController 
    .then((wiki) => {
      callback(null, wiki);
    })
    .catch((err) => {
      callback(err);
    })
  },
  getWiki(id, callback){
    return Wiki.findByPk(id, {
      include: [
        { model: Collaborator, as: "collaborators"}
      ]
    })
    .then((wiki) => {
      callback(null, wiki);
    })
    .catch((err) => {
      callback(err);
    })
  },
  deleteWiki(id, callback){
    return Wiki.destroy({
      where: {id}
    })
    .then((wiki) => {
      callback(null, wiki);
    })
    .catch((err) => {
      callback(err);
    })
  },
  updateWiki(id, updatedWiki, callback){
    return Wiki.findByPk(id)
    .then((wiki) => {
      if(!wiki){
        return callback("Wiki not found");
      }
      wiki.update(updatedWiki, {
        fields: Object.keys(updatedWiki)
      })
      .then(() => {
        callback(null, wiki);
      })
      .catch((err) => {
        callback(err);
      });
    });
  },
  makeWikisPublic(id){
    return Wiki.findAll()
    .then((wikis) => {
      wikis.forEach((wiki) => {
        if(wiki.userId === id && wiki.private === true){
          wiki.update({
            private: false
          })
        }
      })
    })
    .catch((err) => {
      console.log(err);
    })
  }
  

}