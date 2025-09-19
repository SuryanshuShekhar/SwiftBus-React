import React from 'react'
import { Link } from 'react-router-dom'

export default function FeaturedRoutes({routes}){
  return (
    <div className="row g-3">
      {routes.map(r => (
        <div className="col-md-4" key={r.id}>
          <div className="card ticket-card shadow-soft h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <h6 className="mb-0">{r.name}</h6>
                <span className="badge text-bg-light">{r.type}</span>
              </div>
              <div className="mt-2 small text-secondary">{r.from} → {r.to}</div>
              <div className="mt-2 small">
                <div>Departure: <strong>{r.departure}</strong></div>
                <div>Arrival:&nbsp;&nbsp;&nbsp;&nbsp;<strong>{r.arrival}</strong></div>
              </div>
              <div className="d-flex justify-content-between align-items-center mt-3">
                <div className="h5 mb-0">₹{r.price}</div>
                <Link to={`/bus/${r.id}`} className="btn btn-sm btn-success">Book Now</Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
