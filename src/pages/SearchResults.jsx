import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import TicketCard from '../components/TicketCard'
import { searchBuses } from '../api/apiClient'

function useQuery(){
  const { search } = useLocation()
  return Object.fromEntries(new URLSearchParams(search))
}

export default function SearchResults(){
  const q = useQuery()
  const [list,setList] = useState([])
  const [loading,setLoading] = useState(true)

  useEffect(()=>{
    (async ()=>{
      const data = await searchBuses(q)
      setList(data)
      setLoading(false)
    })()
  }, [q.from, q.to, q.date, q.passengers])

  return (
    <div className="container py-4">
      <h4 className="fw-bold mb-3">Buses from {q.from} to {q.to} on {q.date}</h4>
      {loading && <div className="alert alert-info">Searching buses...</div>}
      {!loading && list.length===0 && <div className="alert alert-warning">No buses found. Try another date or route.</div>}
      {!loading && list.map(b => <TicketCard key={b.id} bus={b} />)}
    </div>
  )
}
