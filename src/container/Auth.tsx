import React from 'react';
import { authentication, instance } from '../fb';
import Signin from '../components/Auth/Auth';

const Auth = () => {
  const handleClickSocial = async (e: any) => {
    let provider: any;
    provider = new instance.auth.GoogleAuthProvider()
    await authentication.signInWithPopup(provider);
  };

  return <Signin onClick={handleClickSocial} />;
};

export default Auth;