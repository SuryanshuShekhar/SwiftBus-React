import React from 'react'
import HeroSearch from '../components/HeroSearch'
import OfferCard from '../components/OfferCard'
import FeaturedRoutes from '../components/FeaturedRoutes'
import { offers } from '../api/mockData'
import { routes } from '../api/mockData'

export default function Home(){
  return (
    <>
      <HeroSearch />

      <section className="py-5">
        <div className="container">
          <h3 className="fw-bold text-center mb-3">Special Offers</h3>
          <div className="row g-3">
            {offers.map((o,i)=> (
              <div className="col-md-4" key={i}>
                <OfferCard {...o} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-5">
        <div className="container">
          <h3 className="fw-bold text-center mb-3">Featured Bus Routes</h3>
          <FeaturedRoutes routes={routes.slice(0,3)} />
        </div>
      </section>

      <section id="app" className="py-5 app-gradient text-white">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h3 className="fw-bold">Travel Smarter with Our Mobile App</h3>
              <p>Experience seamless bus booking with exclusive mobile offers, real-time tracking, and instant confirmations.</p>
              <ul className="small">
                <li>Quick Booking</li>
                <li>Secure Payments</li>
                <li>Live Tracking</li>
              </ul>
              <div className="d-flex gap-2">
                <a href="#" className="btn btn-light btn-sm">Download on App Store</a>
                <a href="#" className="btn btn-outline-light btn-sm">Get it on Google Play</a>
              </div>
            </div>
            <div className="col-md-6">
              <img src="/assets/hero.jpg" className="img-fluid rounded-3 shadow-soft" alt="App preview" />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
