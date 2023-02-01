import React from 'react';
import DialogContentText from '@mui/material/DialogContentText';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import InputWithLabel from 'components/InputWithLabel';
import CustomPrimaryButton from 'components/CustomPrimaryButton';
import { validateMail } from 'utils/validators';
import { Typography } from '@mui/material';
import { inviteFriend } from 'redux/friends/thunk';
import { useDispatch, useSelector } from 'react-redux';
import { friendsSelector } from 'redux/friends/selector';

const AddFriendDialog = ({ title, isDialogOpen, closeDialogHandler, sendFriendInvitation = () => {} }) => {
    const [mail, setMail] = React.useState('');
    const [isFormValid, setIsFormValid] = React.useState(false);
    const dispatch = useDispatch();
    const {statusInvitation} = useSelector(friendsSelector);

    const handleSendInvitations = () => {
        dispatch(inviteFriend({mail}))
    }

    const handleCloseDialog = () => {
        closeDialogHandler();
        setMail('');
    }

    React.useEffect(() => {
        setIsFormValid(validateMail(mail))
    }, [mail, setIsFormValid]);

    React.useEffect(() => {
        
        if(statusInvitation === 'success') {
            handleCloseDialog();
        }

    }, [statusInvitation])


    return (
    <div>
        <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
            <DialogTitle><Typography>Invite a Friend</Typography></DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <Typography>Enter e-mail address of friend which you would like to invite</Typography>
                </DialogContentText>
                <InputWithLabel 
                    label='Mail'
                    type='text'
                    value={mail}
                    setValue={setMail}
                    placeholder='Enter e-mail address'
                />
            </DialogContent>
            <DialogActions>
                <CustomPrimaryButton
                    onClick={handleSendInvitations}
                    disabled={!isFormValid}
                    label='Send'
                    additionalStyles={{
                        marginLeft: '15px',
                        marginRight: '15px',
                        marginBottom: '10px',
                        width: '100%'
                    }}
                />
            </DialogActions>
        </Dialog>
    </div>
  )
}

export default AddFriendDialog