const express = require('express');
const router = express.Router();
const friendsController = require('../controllers/friendsController');
const authMiddleware = require('../middleware/authMiddleware');
const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});


const postInvitationSchema = Joi.object({
    mail: Joi.string().email()
});

const invtiteDecisionScheme = Joi.object({
    inviteId: Joi.string().required()
})


router.post('/invite', authMiddleware,validator.body(postInvitationSchema),  friendsController.invite);
router.post('/invititaions/accept', authMiddleware,validator.body(invtiteDecisionScheme), friendsController.acceptInvitation);
router.post('/invititaions/reject', authMiddleware,validator.body(invtiteDecisionScheme), friendsController.rejectInvitation);


module.exports = router;