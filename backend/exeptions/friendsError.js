module.exports = class FriendsError extends Error {
    status;
    errors;

    constructor(status, message, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static InvitationYourself() {
        return new FriendsError(409, `Sorry. You cannot become friend with yourself`);
    }
    static NotFound(targetMail) {
        return new FriendsError(404, `Friend of ${targetMail} has not been found.Please check mail address`);
    }
    static InvitationAlreadyExist() {
        return new FriendsError(409, `Invitation has been already sent`);
    }
    static FriendAlreadyExist() {
        return new FriendsError(409, `Friend already added. Please check friends list`);
    }
    static NotFoundInvite() {
        return new FriendsError(401, 'Error occured. Please try again');
    }
}