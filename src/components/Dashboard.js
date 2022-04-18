import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Dashboard() {
    const [error, setError] = useState('')
    const { currentUser, logout } = useAuth()
    const navigate = useNavigate()
    async function handleLogout() {
        setError('')

        try {
            await logout()
            navigate('/login')
        } catch {
            setError('Failded to log out!')
        }
    }
    return (
        <>
            <div className='w-full h-14 bg-primary-color flex justify-between items-center px-4'>
                <div className='font-bold text-2xl text-blue-100 hover:text-buttons-color transition-colors'>Dashboard</div>
                <div className={`flex gap-x-2 items-center ${currentUser ? 'hidden' : ''}`}>
                    < Link to='/signup' className='text-sm font-semibold text-blue-100 transition-colors hover:text-buttons-color'>Sign Up</Link>
                    <p className='text-sm font-semibold text-blue-100'>/</p>
                    <Link to='/login' className='text-sm font-semibold text-blue-100 transition-colors hover:text-buttons-color'>Login</Link>
                </div>
                <div className={`flex gap-x-1 items-center text-sm font-semibold text-blue-100 transition-colors hover:hover:text-buttons-color ${!currentUser ? 'hidden' : ''}`}>
                    <Link to='/update-profile' className='text-sm font-semibold text-blue-100 transition-colors hover:hover:text-buttons-color'>Profile</Link>
                    <p className='text-sm font-semibold text-blue-100'>/</p>
                    <button className='text-sm font-semibold text-blue-100 hover:text-buttons-color' onClick={handleLogout}>Logout</button>
                </div>
                {error && <h3>{error}</h3>}
            </div>
            <div className='container mx-auto text-center pt-4'>
                <h1 className='text-3xl md:text-6xl text-buttons-color font-extrabold uppercase'>Welcome Back</h1>
                <p className='text-secondary-color text-md md:text-2xl'>{currentUser && currentUser.email}</p>
            </div>

        </>
    )
}
