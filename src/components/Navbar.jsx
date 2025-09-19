import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FaBus, FaPhoneAlt } from 'react-icons/fa'

export default function Navbar(){
  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{background:'#0b1634'}}>
      <div className="container">
        <Link className="navbar-brand fw-bold d-flex align-items-center" to="/">
          <FaBus className="me-2" /> Swift<span className="text-success">Bus</span>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navBar">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navBar">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"><NavLink className="nav-link" to="/offers">Offers</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/tickets">Tickets</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/pnr">PNR Check</NavLink></li>
          </ul>
          <div className="text-white small d-flex align-items-center">
            <FaPhoneAlt className="me-2" /> 24x7 Support:
            <a className="ms-1 text-decoration-none text-info" href="tel:+911234567890">+91-1234567890</a>
          </div>
        </div>
      </div>
    </nav>
  )
}
