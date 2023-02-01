module.exports = class AuthError extends Error {
    status;
    errors;

    constructor(status, message, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }
    static Unauthorization(message = null) {
        return new AuthError(401, message ||  'User is not authorized');
    }
    static Notfound() {
        return new AuthError(404, 'User not found');
    }
    static UncorrectData(message, errors = []) {
        return new AuthError(409, message);
    }
    static UserExist(message, errors = []) {
        return new AuthError(409, message);
    }
}