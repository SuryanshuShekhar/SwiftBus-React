import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaMapMarkerAlt, FaCalendarAlt, FaUser } from 'react-icons/fa'

export default function HeroSearch(){
  const [form, setForm] = useState({ from:'Delhi', to:'Jaipur', date:new Date().toISOString().slice(0,10), passengers:1 })
  const navigate = useNavigate()

  const onSubmit = (e)=>{
    e.preventDefault()
    const q = new URLSearchParams(form).toString()
    navigate(`/search?${q}`)
  }

  return (
    <header className="bg-hero d-flex align-items-center">
      <div className="container">
        <h1 className="display-5 fw-extrabold">Your Journey, <span className="brand">Our</span> Priority</h1>
        <p className="lead">Book bus tickets with ease. Travel in comfort. Arrive with a smile.</p>

        <form onSubmit={onSubmit} className="glass rounded-2xl shadow-soft p-3 p-md-4 mt-4">
          <div className="row g-2 g-md-3 align-items-end">
            <div className="col-12 col-md-3">
              <label className="form-label small">From</label>
              <div className="input-group">
                <span className="input-group-text"><FaMapMarkerAlt /></span>
                <input value={form.from} onChange={e=>setForm({...form, from:e.target.value})} className="form-control" placeholder="From city" />
              </div>
            </div>
            <div className="col-12 col-md-3">
              <label className="form-label small">To</label>
              <div className="input-group">
                <span className="input-group-text"><FaMapMarkerAlt /></span>
                <input value={form.to} onChange={e=>setForm({...form, to:e.target.value})} className="form-control" placeholder="Destination" />
              </div>
            </div>
            <div className="col-6 col-md-3">
              <label className="form-label small">Departure Date</label>
              <div className="input-group">
                <span className="input-group-text"><FaCalendarAlt /></span>
                <input type="date" value={form.date} onChange={e=>setForm({...form, date:e.target.value})} className="form-control" />
              </div>
            </div>
            <div className="col-6 col-md-2">
              <label className="form-label small">Passengers</label>
              <div className="input-group">
                <span className="input-group-text"><FaUser /></span>
                <input type="number" min="1" value={form.passengers} onChange={e=>setForm({...form, passengers:e.target.value})} className="form-control" />
              </div>
            </div>
            <div className="col-12 col-md-1 d-grid">
              <button className="btn btn-success btn-lg">Search</button>
            </div>
          </div>
        </form>
      </div>
    </header>
  )
}
