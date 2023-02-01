import React from 'react';
import AuthBox from 'components/AuthBox';
import LoginHeader from 'components/Login/Header';
import Inputs from 'components/Login/Inputs';
import Footer from 'components/Login/Footer';
import { validateLoginForm } from 'utils/validators';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserLogin } from 'redux/user/thunk';
import { useNavigate } from 'react-router-dom';
import { userSelector } from 'redux/user/selector';

const Login = () => {
  const [mail, setMail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isFormValid, setIsFormValid] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {status, userDetails} = useSelector(userSelector);

  const handleLogin = async () => {
    dispatch(fetchUserLogin({mail, password}));
  }


  React.useEffect(() => {
      setIsFormValid(validateLoginForm({ mail, password }))
  }, [mail, password, setIsFormValid]);

  React.useEffect(() => {
      if(status === 'success' || userDetails) {
        navigate('/dashboard');
      }
  },[status, userDetails]);


  return (
    <AuthBox>
      <LoginHeader/>
      <Inputs
        mail={mail}
        setMail={setMail}
        password={password}
        setPassword={setPassword}
      />
      <Footer
        isFormValid={isFormValid}
        handleLogin={handleLogin}
        statusLoading={status === 'loading'}
      />
    </AuthBox>
  )
}

export default Login