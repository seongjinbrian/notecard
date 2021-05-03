import React from 'react';
import { authentication, instance } from '../fb';
import Signin from '../components/Auth/Auth';

const Auth = () => {
  const handleClickSocial = async (e: any) => {
    const { name } = e.target;
    let provider: any;

    // if (name === 'google') {
    //   provider = new instance.auth.GoogleAuthProvider();
    // } else if (name === 'github') {
    //   provider = new instance.auth.GithubAuthProvider();
    // }
    provider = new instance.auth.GoogleAuthProvider()
    await authentication.signInWithPopup(provider);
  };

  return <Signin onClick={handleClickSocial} />;
};

export default Auth;