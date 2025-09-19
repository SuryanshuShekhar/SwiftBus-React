import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { fetchBus } from '../api/apiClient'

export default function BusDetails(){
  const { id } = useParams()
  const [bus,setBus] = useState(null)

  useEffect(()=>{ (async ()=> setBus(await fetchBus(id)))() }, [id])

  if(!bus) return <div className="container py-4"><div className="alert alert-info">Loading bus...</div></div>

  return (
    <div className="container py-4">
      <div className="row g-3">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h5 className="fw-bold">{bus.name}</h5>
              <div className="text-secondary small mb-2">{bus.type} • {bus.amenities.join(', ')}</div>
              <p>Route: {bus.from} → {bus.to}</p>
              <p>Departure: {bus.departure} | Arrival: {bus.arrival}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <div className="h4">₹{bus.price}</div>
              <Link className="btn btn-success w-100" to={`/checkout/${bus.id}`}>Proceed to Book</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
