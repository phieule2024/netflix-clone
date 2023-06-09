/*
 * Created Date: Mo Mar 2023
 * Author: Phieule
 * File: auth.tsx
 * Project: netflix-clone
 * -----
 * Last Modified: Mon Mar 20 2023
 * Modified By: Phieule
 * -----
 * Copyright (c) 2023 Voices of Sales Consultancy
 * -----
 * HISTORY:
 * Date      	By	Comments
 * ----------	---	---------------------------------------------------------
 */
import { useCallback, useState } from 'react'
import Input from '@/components/input'
import axios from 'axios'
import { signIn } from 'next-auth/react'

import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'

const Auth = () => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const [variant, setVariant] = useState('login')

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) => (currentVariant === 'login' ? 'register' : 'login'))
  }, [])

  const login = useCallback(async () => {
    try {
      await signIn('credentials', {
        email,
        password,
        callbackUrl: '/profiles'
      })
    } catch (E) {}
  }, [email, password])

  const register = useCallback(async () => {
    try {
      await axios.post('/api/register', {
        email,
        name,
        password
      })
      login()
    } catch (E) {}
  }, [email, name, password, login])

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className='bg-black w-full h-full lg:bg-opacity-50'>
        <nav className='px-12 py-5'>
          <img src='/images/logo.png' alt='Logo' className='h-12' />
        </nav>
        <div className='flex justify-center'>
          <div className='bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full'>
            <h2 className='text-white text-4xl mb-8 font-semibold'>{variant === 'login' ? 'Sign in' : 'Register'}</h2>
            <div className='flex flex-col gap-4'>
              {variant === 'register' && (
                <Input label='User Name' onchange={(_e: any) => setName(_e.target.value)} id='name' value={name} />
              )}
              <Input
                label='Email'
                onchange={(_e: any) => setEmail(_e.target.value)}
                id='email'
                type='email'
                value={email}
              />
              <Input
                label='Password'
                onchange={(_e: any) => setPassword(_e.target.value)}
                id='password'
                type='password'
                value={password}
              />
            </div>
            <button
              className='bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition'
              onClick={variant === 'login' ? login : register}
            >
              {variant === 'login' ? 'Login' : 'Sign in'}
            </button>
            <div className='flex flex-row items-center gap-4 mt-8 justify-center'>
              <div
                className='
                                w-10
                                h-10
                                bg-white
                                rounded-full
                                flex
                                items-center
                                justify-center
                                cursor-pointer
                                hover:opacity-80
                                transition
                                '
                onClick={() => signIn('google', { callbackUrl: '/profiles' })}
              >
                <FcGoogle size={30} />
              </div>
              <div
                className='
                                w-10
                                h-10
                                bg-white
                                rounded-full
                                flex
                                items-center
                                justify-center
                                cursor-pointer
                                hover:opacity-80
                                transition
                                '
                onClick={() => signIn('github', { callbackUrl: '/profiles' })}
              >
                <FaGithub size={30} />
              </div>
            </div>
            <p className='text-neutral-500 mt-12'>
              {variant === 'login' ? 'First time using Netflix?' : 'Already have an account?'}
              <span className='text-white ml-1 hover:underline cursor-pointer' onClick={toggleVariant}>
                {variant === 'login' ? 'Create an account' : 'Login'}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth
