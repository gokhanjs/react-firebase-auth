import React, { useRef, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'

export default function ForgotPassword() {
    const emailRef = useRef()
    const { resetPassword } = useAuth()
    const [error, setError] = useState()
    const [loading, setLoading] = useState()
    const [message, setMessage] = useState()
    async function handleSubmit(e) {
        e.preventDefault()
        try {
            setMessage('')
            setError('')
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage('Check your inbox for further instructions.')
        } catch {
            setError('Failded to reset password!')
        }
        setLoading(false)
    }
    return (

        <div className='gradient-bg h-screen flex flex-col items-center justify-center'>
            <div className='max-w-lg w-full px-2'>
                <div className='bg-buttons-color rounded-t-lg py-6 shadow'>
                    <h2 className='text-xl md:text-4xl font-extrabold text-center text-primary-color'>Password Reset Page</h2>
                </div>
                <div className='bg-primary-color w-full p-4 flex flex-col gap-y-4'>
                    <form className='flex flex-col gap-y-4' onSubmit={handleSubmit}>
                        {error && <div className='rounded bg-red-500 p-2 text-sm font-semibold text-primary-color'>{error}</div>}
                        {message && <div className='rounded bg-green-500 p-2 text-sm font-semibold text-primary-color'>{message}</div>}
                        <div className='flex flex-col gap-y-1'>
                            <h3 className='text-xs md:text-sm font-semibold text-secondary-color'>E-Mail:</h3>
                            <input type="email" className='text-sm md:text-md bg-transparent text-secondary-color outline-none border-b border-buttons-color py-1' placeholder='Enter your email...' ref={emailRef} required></input>
                        </div>

                        <button className='bg-buttons-color mx-4 rounded-lg p-3 text-sm md:text-md font-semibold hover:opacity-20' disabled={loading} type="submit">Reset Password</button>
                    </form>
                    <h4 className='text-secondary-color text-center'><Link to='/login' className='text-blue-600'>Log In</Link></h4>
                </div>
            </div >
        </div>
    )
}
