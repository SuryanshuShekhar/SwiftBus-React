import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'

export default function Tickets(){
  const tickets = useMemo(() => {
    try { return JSON.parse(localStorage.getItem('swiftbus.tickets') || '[]').reverse() }
    catch { return [] }
  }, [])

  if(!tickets.length){
    return (
      <div className="container py-4">
        <div className="alert alert-info">No tickets found yet. Book a trip to see it here.</div>
        <Link className="btn btn-success" to="/">Search Buses</Link>
      </div>
    )
  }

  return (
    <div className="container py-4">
      <h4 className="fw-bold mb-3">My Tickets</h4>
      {tickets.map((t,idx)=>(
        <div key={idx} className="card mb-3 shadow-sm">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h6 className="mb-1">{t.bus.name} • {t.bus.type} • <span className="text-uppercase">{t.bus.source}</span></h6>
                <div className="small text-secondary">{t.bus.from} → {t.bus.to} | {t.bus.departure} - {t.bus.arrival}</div>
                <div className="small">PNR: <strong>{t.pnr}</strong> • TXN: <strong>{t.txn}</strong></div>
                <div className="small">Passenger: {t.passenger} • Seats: {t.seats.join(', ')}</div>
              </div>
              <div className="text-end">
                <div className="h5">₹{t.amount}</div>
                <div className="small text-secondary">{new Date(t.bookedAt).toLocaleString()}</div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
