import React, { useRef, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

export default function UpdateProfile() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { currentUser, updateUserPassword, updateUserEmail } = useAuth()
    const [error, setError] = useState()
    const [loading, setLoading] = useState()
    const navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        setError('')
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Password do not match")
        }
        const promises = []
        if (emailRef.current.value !== currentUser.email) {
            promises.push(updateUserEmail(emailRef.current.value))
        }
        if (passwordRef.current.value) {
            promises.push(updateUserPassword(passwordRef.current.value))
        }
        Promise.all(promises).then(() => {
            navigate('/')
        }).catch(() => {
            setError('Failded to update account!')
        }).finally(() => {
            setLoading(false)
        })
    }
    return (
        <div className='gradient-bg h-screen flex flex-col items-center justify-center'>
            <div className='max-w-lg w-full px-2'>
                <div className='bg-buttons-color rounded-t-lg py-6 shadow'>
                    <h2 className='text-xl md:text-4xl font-extrabold text-center text-primary-color'>Update Profile Page</h2>
                </div>
                <div className='bg-primary-color w-full p-4 flex flex-col gap-y-3'>
                    <form className='flex flex-col gap-y-4' onSubmit={handleSubmit}>
                        {error && <div className='rounded bg-red-500 p-2 text-sm font-semibold text-primary-color'>{error}</div>}
                        <div className='flex flex-col gap-y-1'>
                            <h3 className='text-xs md:text-sm font-semibold text-secondary-color'>E-Mail:</h3>
                            <input type="email" className='text-sm md:text-md bg-transparent text-secondary-color outline-none border-b border-buttons-color py-1' placeholder='Enter your new email' ref={emailRef} defaultValue={currentUser.email} required></input>
                        </div>
                        <div className='flex flex-col gap-y-1'>
                            <h3 className='text-xs md:text-sm font-semibold text-secondary-color'>Password:</h3>
                            <input type="password" className='text-sm md:text-md bg-transparent text-secondary-color outline-none border-b border-buttons-color py-1' placeholder='Leave blank keep to same' ref={passwordRef}></input>
                        </div>
                        <div className='flex flex-col gap-y-1'>
                            <h3 className='text-xs md:text-sm font-semibold text-secondary-color'>Confirm Password:</h3>
                            <input type="password" className='text-sm md:text-md bg-transparent text-secondary-color outline-none border-b border-buttons-color py-1' placeholder='Leave blank keep to same' ref={passwordConfirmRef}></input>
                        </div>

                        <button className='bg-buttons-color mx-4 rounded-lg p-3 text-sm md:text-md font-semibold hover:opacity-20' disabled={loading} type="submit">Update Account</button>
                    </form>
                    <div className='flex flex-col gap-y-2'>
                        <h4 className='text-secondary-color text-center'><Link to='/' className='text-blue-400'>Cancel</Link></h4>
                    </div>
                </div>
            </div >
        </div>
    )
}
