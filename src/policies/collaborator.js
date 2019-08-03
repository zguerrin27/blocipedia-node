const ApplicationPolicy = require("./application");

module.exports = class CollaboratorPolicy extends ApplicationPolicy {

  new() {
    return this._isAdmin() || this._isPremium();
  }

  create() {
    return this.new();
  }

  edit() {
    return this._isAdmin() || this._isPremium();
  }

  update() {
    return this.edit();
  }

  destroy() {
    return this.update();
  }

}