import React from 'react';
import InputWithLabel from 'components/InputWithLabel';

const Inputs = ({ mail, setMail, password, setPassword }) => {
  return (
   <>
      <InputWithLabel
        value={mail}
        setValue={setMail}
        label='E-mail'
        type='text'
        placeholder='Enter e-mail address'
      />
       <InputWithLabel
        value={password}
        setValue={setPassword}
        label='Pasword'
        type='password'
        placeholder='Enter password'
      /> 
   </>
  )
}

export default Inputs