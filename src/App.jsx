import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import SearchResults from './pages/SearchResults'
import BusDetails from './pages/BusDetails'
import Offers from './pages/Offers'
import Checkout from './pages/Checkout'
import PaymentSuccess from './pages/PaymentSuccess'
import Tickets from './pages/Tickets'
import PnrCheck from './pages/PnrCheck'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/bus/:id" element={<BusDetails />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/tickets" element={<Tickets />} />
        <Route path="/pnr" element={<PnrCheck />} />
        <Route path="/checkout/:id" element={<Checkout />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  )
}
