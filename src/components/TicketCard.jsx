import React from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

export default function TicketCard({ bus }) {
  const sourceColor =
    bus.source === "swiftbus"
      ? "secondary"
      : bus.source === "redbus"
      ? "danger"
      : bus.source === "zingbus"
      ? "warning"
      : "light";

  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
        <div>
          <h6 className="mb-1">
            {bus.name} <span className="badge text-bg-light">{bus.type}</span>{" "}
            <span
              className={`badge text-bg-${sourceColor} ms-1 text-uppercase`}
            >
              {bus.source}
            </span>
          </h6>
          <div className="small text-secondary">
            {bus.from} → {bus.to}
          </div>
          <div className="small mt-1">
            <FaStar className="text-warning me-1" /> {bus.rating} •{" "}
            {bus.amenities.join(", ")}
          </div>
        </div>
        <div className="d-flex align-items-center gap-4 mt-2 mt-md-0">
          <div className="text-center">
            <div className="small text-secondary">Departure</div>
            <div className="fw-semibold">{bus.departure}</div>
          </div>
          <div className="text-center">
            <div className="small text-secondary">Arrival</div>
            <div className="fw-semibold">{bus.arrival}</div>
          </div>
          <div className="text-center">
            <div className="small text-secondary">Price</div>
            <div className="h5 mb-0">₹{bus.price}</div>
          </div>
          <Link to={`/checkout/${bus.id}`} className="btn btn-success">
            Select Seats
          </Link>
        </div>
      </div>
    </div>
  );
}
