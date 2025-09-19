import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { FaCheckCircle, FaPrint } from "react-icons/fa";

export default function PaymentSuccess() {
  const { state } = useLocation();
  const txn = state?.transactionId || "TXN000000";
  const pnr = state?.pnr || "XXXXXX";
  const t = state || {};

  useEffect(() => {
    if (!t || !t.bus) return;
    const existing = JSON.parse(
      localStorage.getItem("swiftbus.tickets") || "[]"
    );
    existing.push({
      pnr,
      txn,
      passenger: t.passenger,
      seats: t.seats,
      amount: t.amount,
      method: t.method,
      coupon: t.coupon,
      discount: t.discount || 0,
      bus: t.bus,
      bookedAt: new Date().toISOString(),
    });
    localStorage.setItem("swiftbus.tickets", JSON.stringify(existing));
  }, [pnr, txn]);

  return (
    <div className="container py-5">
      <div className="text-center mb-4">
        <FaCheckCircle size={64} className="text-success mb-3" />
        <h3 className="fw-bold">Payment Successful</h3>
        <p className="text-secondary">
          Transaction ID: <strong>{txn}</strong> • PNR: <strong>{pnr}</strong>
        </p>
      </div>

      <div className="card shadow-sm mx-auto" style={{ maxWidth: 720 }}>
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="fw-bold mb-0">E-Ticket</h5>
            <span className="badge text-bg-success">CONFIRMED</span>
          </div>
          <hr />
          <div className="row small">
            <div className="col-md-6">
              <div>
                <strong>Passenger:</strong> {t.passenger || "—"}
              </div>
              <div>
                <strong>PNR:</strong> {pnr}
              </div>
              <div>
                <strong>Payment Method:</strong> {t.method}
              </div>
              {t.coupon && (
                <div>
                  <strong>Coupon:</strong> {t.coupon} (−₹{t.discount})
                </div>
              )}
            </div>
            <div className="col-md-6">
              <div>
                <strong>Bus:</strong> {t.bus?.name} • {t.bus?.type} •{" "}
                <span className="text-uppercase">{t.bus?.source}</span>
              </div>
              <div>
                <strong>Route:</strong> {t.bus?.from} → {t.bus?.to}
              </div>
              <div>
                <strong>Departure:</strong> {t.bus?.departure} &nbsp;{" "}
                <strong>Arrival:</strong> {t.bus?.arrival}
              </div>
            </div>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <div>
              <strong>Seats:</strong>{" "}
              {Array.isArray(t.seats) ? t.seats.join(", ") : "—"}
            </div>
            <div>
              <strong>Paid:</strong> ₹{t.amount}
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-4 d-flex justify-content-center gap-2">
        <button
          className="btn btn-outline-secondary"
          onClick={() => window.print()}
        >
          <FaPrint className="me-1" /> Print Ticket
        </button>
        <Link to="/tickets" className="btn btn-success">
          View My Tickets
        </Link>
        <Link to="/" className="btn btn-outline-success">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
