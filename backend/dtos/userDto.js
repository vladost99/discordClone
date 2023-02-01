module.exports = class UserDto {
    mail;
    _id;
    name;
    
    constructor(model) {
        this.mail = model.mail;
        this._id = model._id;
        this.name = model.name;
    }
}