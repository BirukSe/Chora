import { useSignIn } from '@clerk/nextjs';
import React from 'react';
import { Button } from '../components/ui/button';

const SignInOAuthButtons = () => {
  const { signIn, isLoaded } = useSignIn();

  if (!isLoaded) {
    return null;
  }

  const signInWithGoogle = () => {
    signIn.authenticateWithRedirect({
      strategy: 'oauth_google',
      redirectUrl: '/sso-callback',
      redirectUrlComplete: '/feed',
    });
  };

  return (
    <Button
      variant={"secondary"}
      className="w-full h-11 flex items-center justify-center space-x-3 bg-white text-black dark:bg-gray-800 dark:text-white border-zinc-200 hover:bg-gray-100 dark:hover:bg-gray-700"
      onClick={signInWithGoogle}
    >
      <img
        src="https://developers.google.com/identity/images/g-logo.png"
        alt="Google Logo"
        className="h-5 w-5"
      />
      <span className="font-bold">Continue with Google</span>
    </Button>
  );
};

export default SignInOAuthButtons;