const FriendsService = require('../services/friendsService');

class FriendsController {
    async invite(req, res, next) {
       try {
            const { mail } = req.body;
            const invitation = await FriendsService.invite({receive_mail: mail, sender_user: req.user});

            res.status(201).json({
                invitation
            });
       }
       catch(err) {
          next(err)
       }
    }
    async acceptInvitation(req, res, next) {
        try {
            const { inviteId } = req.body;
            await FriendsService.acceptInvite(inviteId, req.user._id);

            res.json({message: 'Invitation successfully accepted!'});
        }
        catch(err) {
            next(err);
        }
    }
    async rejectInvitation(req, res, next) {
        try {
            const { inviteId } = req.body;
            await FriendsService.rejectInvite(inviteId, req.user._id);

            res.json({message: 'Invitation successfully rejected!'});
        }
        catch(err) {
            next(err);
        }
    }
}

module.exports = new FriendsController();