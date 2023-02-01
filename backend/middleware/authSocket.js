const TokenService = require('../services/tokenService');
const AuthError = require('../exeptions/authError');

module.exports = (socket, next) => {
    const token = socket.handshake.auth?.token;

    try {
        if(!token) throw AuthError.Unauthorization();
        
        const decoded = TokenService.validateAccessToken(token);

        if(!decoded) throw AuthError.Unauthorization();

        socket.user = decoded;
        
        next();
    }
    catch(err) {
        return next(err);
    }
}