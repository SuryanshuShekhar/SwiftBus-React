import React from 'react'
import OfferCard from '../components/OfferCard'
import { offers } from '../api/mockData'

export default function Offers(){
  return (
    <div className="container py-4">
      <h4 className="fw-bold mb-3">Available Offers</h4>
      <div className="row g-3">
        {offers.map((o,i)=> (
          <div className="col-md-4" key={i}><OfferCard {...o} /></div>
        ))}
      </div>
    </div>
  )
}
