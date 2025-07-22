import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'
import BookForm from '../components/BookForm'

const SellYourBook = () => {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: '/sell-your-book' }} />
  }

  return (
    <div className='my-20'>
      <BookForm />
    </div>
  )
}

export default SellYourBook