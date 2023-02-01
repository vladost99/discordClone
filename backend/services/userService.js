const User = require("../models/user");
const AuthError = require('../exeptions/authError');
const bcrypt = require('bcryptjs');
const UserDto = require('../dtos/userDto');
const TokenService = require('./tokenService');

class UserService {
    async login(mail, password) {
        const user = await User.findOne({ mail });

        if(!user) throw AuthError.Notfound()
        
        const comparePassword = await bcrypt.compare(password, user.password);

        if(user && !comparePassword) throw AuthError.UncorrectData('Uncorrect password');


        const userDto = new UserDto(user); 
        const tokens = TokenService.generateTokens({...userDto});
        
        await TokenService.saveToken(userDto._id, tokens.refreshToken);
       
        return {...tokens, user: userDto}
    }
    async registration(mail, password, name) {
        const candidate = await User.findOne({mail})
        
        if (candidate) {
            throw AuthError.UserExist(`A user with an email ${mail} already exists`);
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const user = await User.create({mail, password: hashPassword, name});
        const userDto = new UserDto(user);
        const tokens = TokenService.generateTokens({...userDto});
        await TokenService.saveToken(userDto._id, tokens.refreshToken);

        return {...tokens, user: userDto}
    }
    async logout(refreshToken) {
        const token = await TokenService.removeToken(refreshToken);
        return token;
    }
    async refresh(refreshToken) {
        if (!refreshToken) {
            throw AuthError.Unauthorization();
        }
        const userData = TokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await TokenService.findToken(refreshToken);

        if(!userData || !tokenFromDb) {
            throw AuthError.Unauthorization();
        }

        const user = await User.findById(userData._id);
        const userDto = new UserDto(user);
        const tokens = TokenService.generateTokens({...userDto});

        await TokenService.saveToken(userDto._id, tokens.refreshToken);
        return {...tokens, user: userDto};
    }
    async findUserById(userId) {
        return User.findById(userId);
    }
}


module.exports = new UserService();