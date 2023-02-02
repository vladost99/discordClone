const UserService = require('../services/userService');

class AuthController {
    async login(req, res, next) {
        try {
            const { mail, password } = req.body;
            const userData = await UserService.login(mail, password);
            
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.json({userDetails: userData});
        }
        catch (err) {
           next(err);
        }
    }
    async register(req, res, next) {
        try {
            const { name, mail, password} = req.body;
            const userData = await UserService.registration(mail, password, name);
            
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json({userDetails: userData});
        }
        catch(err) {
           next(err);
        }
    }
    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const token = await UserService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token);
        }
        catch(err) {
            next(err);
        }
    }
    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const userData = await UserService.refresh(refreshToken);
            
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.json({userDetails: userData});
        }
        catch(err) {
            next(err);
        }
    }
}

module.exports = new AuthController();