const ApplicationPolicy = require("./application");

module.exports = class WikiPolicy extends ApplicationPolicy {

  new() {
    return this._isAdmin() || this._isStandard() || this._isPremium();
  }

  create() {
    return this.new();
  }

  edit() {
    return this._isAdmin() || this._isStandard() || this._isPremium();
  }

  update() {
    return this.edit();
  }

  destroy() {
    return this.update();
  }

  // destroy() {
  //   if(this._isOwner()){
  //     return this.update();
  //   }
  // }

}