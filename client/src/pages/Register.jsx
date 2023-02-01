import React from 'react';
import AuthBox from 'components/AuthBox';
import Inputs from 'components/Register/Inputs';
import Footer from 'components/Register/Footer';
import { Typography } from '@mui/material';
import { validateFormRegister } from 'utils/validators';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUserRegister } from 'redux/user/thunk';
import { userSelector } from 'redux/user/selector';

const Register = () => {
  const [mail, setMail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [isFormValid, setIsFormValid] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {registerStatus, userDetails} = useSelector(userSelector);

  const handleRegister = () => {
    dispatch(fetchUserRegister({name, mail, password}));
  }

  React.useEffect(() => {
     if(registerStatus === 'success') {
       navigate('/login');
     } 
  }, [registerStatus]);


  React.useEffect(() => {
      if(userDetails) {
        navigate('/dashboard');
      }
  }, [userDetails])


  React.useEffect(() => {
    setIsFormValid(validateFormRegister({name, mail, password}))
  }, [name, mail, password, setIsFormValid]);

  return (
   <AuthBox>
     <Typography variant='h5' sx={{ color: 'white' }}>Create an account</Typography>
     <Inputs
       mail={mail}
       setMail={setMail}
       password={password}
       setPassword={setPassword}
       name={name}
       setName={setName} 
     />
     <Footer
      handleRegister={handleRegister}
      isFormValid={isFormValid}
      statusLoading={registerStatus === 'loading'}
     />
   </AuthBox>
  )
}

export default Register