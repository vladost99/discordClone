import React from 'react';
import InputWithLabel from 'components/InputWithLabel';

const Inputs = ({mail, setMail, password, setPassword, name, setName }) => {
  return (
    <>
        <InputWithLabel 
            value={mail}
            setValue={setMail}
            label='E-mail address'
            type='text'
            placeholder='E-mail address'
        />
        <InputWithLabel 
            value={password}
            setValue={setPassword}
            label='Password'
            type='password'
            placeholder='Password'
        />
        <InputWithLabel 
            value={name}
            setValue={setName}
            label='Username'
            type='text'
            placeholder='Username'
        />
    </>
  )
}

export default Inputs