
"use client"
import React, { useEffect, useState } from 'react';
import { SignedIn, SignedOut, SignOutButton } from '@clerk/nextjs';
import SignInOAuthButtons from '@/additional/googleAuth';
import { z } from 'zod';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAuthContext } from './AuthContext';
import {useRouter} from 'next/navigation';
import Loader from './loader';
interface LoginFormData {

  username: string;
  password: string;
}

import { LoginValidation } from '@/validation/LoginValidation';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../components/ui/form';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';




const Signin =  ({ onToggle }: { onToggle: () => void }) => {
  const [isLoading, setIsLoading]=useState<boolean>(false);
  const router = useRouter();
  const {setCurrentUserName}=useAuthContext();
  const [typedText, setTypedText] = useState('');
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);


  const list = ['Instant messaging', 'Connect in real time', 'Developed by #Biruk(SE)'];
  


  const form = useForm<LoginFormData>({
    resolver: zodResolver(LoginValidation),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  useEffect(() => {
    const typingInterval = setInterval(() => {
      if (charIndex < list[index].length) {
        setTypedText((prev) => prev + list[index][charIndex]);
        setCharIndex((prev) => prev + 1);
      } else {
        setTimeout(() => {
          setIndex((prevIndex) => (prevIndex + 1) % list.length);
          setCharIndex(0);
          setTypedText('');
        }, 1500);
      }
    }, 100);
    return () => clearInterval(typingInterval);
  }, [charIndex, index]);

  const onSubmit: SubmitHandler<LoginFormData> = async (values) => {
    const { username, password } = values;
  try{
    setIsLoading(true);
    const response = await fetch('/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password })
     
    });
    if (response.ok) {
      setCurrentUserName(username);
      router.push('/feed');
    } else {
      console.error('Login failed');
    }
  }catch(error){
    console.log(error);
  }
  finally{
    setIsLoading(false);

  }

   
   

   
  };

  const handleGuest = async () => {
   
    
  };

  return (
    
    <>
    {isLoading && <Loader/>}
      <h1
        id="header-text"
        className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-pink-600 drop-shadow-lg"
      >
        {typedText}
      </h1>
      <Form {...form}>
        <div className="sm:w-420 flex-center flex-col">
          <h2 className="text-2xl md:text-2xl font-extrabold text-white leading-tight text-center pt-5 sm:pt-12">
            Login to your account
          </h2>
          <p className="text-light-3 small-medium md:base-regular mt-2">To continue enter your details</p>

          <form onSubmit={form.handleSubmit(onSubmit)} className="flex-col gap-5 w-full mt-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input type="text" className="shad-input" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" className="shad-input" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="shad-button_primary bg-red-200">
              Sign in
            </Button>

            <p className="text-small-regular text-light-2 text-center mt-2">
              <SignedIn>
                <SignOutButton />
              </SignedIn>
              <SignedOut>
                <SignInOAuthButtons />
              </SignedOut>
            </p>

         

            <p className="text-small-regular text-light-2 text-center mt-2">
              Don't have an account?
              <button
          onClick={onToggle}
          className="text-blue-400 underline hover:text-blue-600"
        >
          Signup
        </button>
             
            </p>
          </form>
        </div>
      </Form>
    </>
  );
};

export default Signin;