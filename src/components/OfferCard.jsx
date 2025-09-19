import React from 'react'

export default function OfferCard({title,desc,code}){
  return (
    <div className="p-3 rounded-3 shadow-sm h-100" style={{background:'#ecfdf5', border:'1px solid #bbf7d0'}}>
      <div className="d-flex justify-content-between align-items-start">
        <h6 className="mb-1">{title}</h6>
        <span className="badge badge-soft">Limited</span>
      </div>
      <p className="small text-secondary mb-2">{desc}</p>
      <div className="input-group input-group-sm">
        <input className="form-control" value={code} readOnly />
        <button className="btn btn-outline-success" onClick={()=>navigator.clipboard.writeText(code)}>Copy</button>
      </div>
    </div>
  )
}
