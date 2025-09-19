import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer(){
  return (
    <footer className="footer-bg mt-auto pt-5 pb-4">
      <div className="container">
        <div className="row g-4">
          <div className="col-md-4">
            <h5 className="fw-bold">Swift<span className="brand">Bus</span></h5>
            <p>Experience India's most trusted bus booking platform.</p>
            <p className="small">© {new Date().getFullYear()} SwiftBus. All rights reserved.</p>
          </div>
          <div className="col-md-4">
            <h6 className="fw-semibold">Quick Links</h6>
            <ul className="list-unstyled">
              <li><Link to="/offers">Offers</Link></li>
              <li><Link to="/search">Search Buses</Link></li>
              <li><Link to="/#app">Mobile App</Link></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h6 className="fw-semibold">Stay Updated</h6>
            <div className="d-flex gap-2">
              <input className="form-control form-control-sm" placeholder="Enter email" />
              <button className="btn btn-sm btn-success">Subscribe</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
