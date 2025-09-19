import React, { useState } from 'react'

export default function PnrCheck(){
  const [pnr,setPnr] = useState('')
  const [result,setResult] = useState(null)

  const onCheck = (e)=>{
    e.preventDefault()
    const list = JSON.parse(localStorage.getItem('swiftbus.tickets') || '[]')
    const found = list.find(t => (t.pnr||'').toUpperCase() === pnr.trim().toUpperCase())
    setResult(found || { notFound: true })
  }

  return (
    <div className="container py-4">
      <h4 className="fw-bold mb-3">PNR Status</h4>
      <form className="row g-2 align-items-end" onSubmit={onCheck}>
        <div className="col-md-4">
          <label className="form-label">Enter PNR</label>
          <input className="form-control" value={pnr} onChange={e=>setPnr(e.target.value)} placeholder="e.g., 7K9FQ2" />
        </div>
        <div className="col-md-2 d-grid">
          <button className="btn btn-success">Check</button>
        </div>
      </form>

      {result?.notFound && (
        <div className="alert alert-warning mt-3">PNR not found. Please verify the code.</div>
      )}

      {result && !result.notFound && (
        <div className="card mt-3">
          <div className="card-body">
            <h6 className="fw-bold mb-1">{result.bus.name} • {result.bus.type} • <span className="text-uppercase">{result.bus.source}</span></h6>
            <div className="small text-secondary">{result.bus.from} → {result.bus.to} | {result.bus.departure} - {result.bus.arrival}</div>
            <div className="small">PNR: <strong>{result.pnr}</strong> • TXN: <strong>{result.txn}</strong></div>
            <div className="small">Passenger: {result.passenger} • Seats: {result.seats.join(', ')}</div>
            <div className="small"><strong>Paid:</strong> ₹{result.amount} via {result.method}</div>
            <div className="small"><strong>Booked:</strong> {new Date(result.bookedAt).toLocaleString()}</div>
          </div>
        </div>
      )}
    </div>
  )
}
