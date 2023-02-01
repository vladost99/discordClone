const TokenService = require('../services/tokenService');
const ApiError  = require('../exeptions/apiError');
const AuthError = require('../exeptions/authError')
module.exports = function (req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return next(AuthError.Unauthorization());
        }

        const accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken) {
            return next(AuthError.Unauthorization());
        }

        const userData = TokenService.validateAccessToken(accessToken);
        if (!userData) {
            return next(AuthError.Unauthorization());
        }

        req.user = userData;
        next();
    } catch (e) {
        return next(ApiError.BadRequest('Bad request'));
    }
};