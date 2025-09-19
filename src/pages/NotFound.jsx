import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound(){
  return (
    <div className="container py-5 text-center">
      <h2 className="fw-bold">404</h2>
      <p className="text-secondary">The page you are looking for does not exist.</p>
      <Link to="/" className="btn btn-success">Go Home</Link>
    </div>
  )
}
