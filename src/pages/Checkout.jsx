import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchBus, pay, validateCoupon } from "../api/apiClient";

function buildSeatLayout() {
  const rows = Array.from({ length: 10 }, (_, i) => i + 1);
  const cols = ["A", "B", "C", "D"];
  return { rows, cols };
}

export default function Checkout() {
  const { id } = useParams();
  const [bus, setBus] = useState(null);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [coupon, setCoupon] = useState("");
  const [couponState, setCouponState] = useState({ valid: false });
  const [method, setMethod] = useState("CARD"); // CARD or UPI

  // card / upi inputs
  const [card, setCard] = useState({ number: "", expiry: "", cvv: "" });
  const [upi, setUpi] = useState({ vpa: "" });

  const [processing, setProcessing] = useState(false);
  const nav = useNavigate();

  const layout = useMemo(() => buildSeatLayout(), []);

  useEffect(() => {
    (async () => {
      setBus(await fetchBus(id));
      setLoading(false);
    })();
  }, [id]);

  const toggleSeat = (seat) => {
    if (bus.bookedSeats.includes(seat)) return;
    setSelectedSeats((s) =>
      s.includes(seat) ? s.filter((x) => x !== seat) : [...s, seat]
    );
  };

  const seatPrice = useMemo(() => (bus ? bus.price : 0), [bus]);
  const subtotal = seatPrice * (selectedSeats.length || 0);
  const discount = useMemo(() => {
    if (!couponState.valid) return 0;
    return couponState.kind === "flat"
      ? couponState.value
      : Math.round(subtotal * (couponState.value / 100));
  }, [couponState, subtotal]);
  const total = Math.max(0, subtotal - discount);

  const applyCoupon = (e) => {
    e.preventDefault();
    const res = validateCoupon(coupon.trim());
    setCouponState(res);
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!bus) return;
    if (selectedSeats.length === 0)
      return alert("Please select at least one seat.");
    if (!name.trim()) return alert("Please enter passenger name.");

    if (method === "CARD") {
      if (!card.number || !card.expiry || !card.cvv)
        return alert("Enter complete card details.");
    } else {
      if (!upi.vpa || !upi.vpa.includes("@"))
        return alert("Enter a valid UPI ID (e.g., name@bank).");
    }

    setProcessing(true);
    const res = await pay(total, {
      name,
      seats: selectedSeats,
      busId: id,
      method,
      basePrice: seatPrice,
      subtotal,
      discount,
      coupon: couponState.valid ? coupon.toUpperCase() : null,
      card: method === "CARD" ? card : undefined,
      upi: method === "UPI" ? upi : undefined,
    });
    setProcessing(false);

    if (res?.status === "success") {
      nav("/payment-success", {
        state: {
          transactionId: res.transactionId,
          pnr: res.pnr,
          amount: res.amount,
          method: res.method,
          passenger: name,
          seats: selectedSeats,
          bus: {
            id: bus.id,
            name: bus.name,
            type: bus.type,
            from: bus.from,
            to: bus.to,
            departure: bus.departure,
            arrival: bus.arrival,
            source: bus.source,
          },
          coupon: couponState.valid ? coupon.toUpperCase() : null,
          discount,
        },
      });
    } else {
      alert("Payment failed. Please try again.");
    }
  };

  if (loading)
    return (
      <div className="container py-4">
        <div className="alert alert-info">Loading checkout…</div>
      </div>
    );

  return (
    <div className="container py-4">
      <div className="row g-3">
        <div className="col-lg-8">
          <div className="card mb-3">
            <div className="card-body">
              <h5 className="fw-bold">Passenger & Payment</h5>
              <form onSubmit={submit} className="mt-3">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Full Name</label>
                    <input
                      className="form-control"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Payment Method</label>
                    <div className="d-flex gap-3">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          id="payCard"
                          checked={method === "CARD"}
                          onChange={() => setMethod("CARD")}
                        />
                        <label className="form-check-label" htmlFor="payCard">
                          Card
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          id="payUpi"
                          checked={method === "UPI"}
                          onChange={() => setMethod("UPI")}
                        />
                        <label className="form-check-label" htmlFor="payUpi">
                          UPI
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Coupon */}
                <div className="row g-3 mt-1 align-items-end">
                  <div className="col-md-6">
                    <label className="form-label">Coupon Code</label>
                    <div className="input-group">
                      <input
                        className="form-control"
                        value={coupon}
                        onChange={(e) => setCoupon(e.target.value)}
                        placeholder="WEEKEND25 / FIRST100 / STUDENT15"
                      />
                      <button
                        className="btn btn-outline-success"
                        onClick={applyCoupon}
                      >
                        Apply
                      </button>
                    </div>
                    {couponState.message && (
                      <div
                        className={`small mt-1 ${
                          couponState.valid ? "text-success" : "text-danger"
                        }`}
                      >
                        {couponState.message}
                      </div>
                    )}
                  </div>
                </div>

                {/* Payment window */}
                <div className="border rounded-3 p-3 mt-3">
                  <h6 className="fw-semibold mb-2">
                    Enter {method === "CARD" ? "Card" : "UPI"} Details
                  </h6>

                  {method === "CARD" ? (
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label">Card Number</label>
                        <input
                          className="form-control"
                          placeholder="4111 1111 1111 1111"
                          value={card.number}
                          onChange={(e) =>
                            setCard({ ...card, number: e.target.value })
                          }
                        />
                      </div>
                      <div className="col-md-3">
                        <label className="form-label">Expiry</label>
                        <input
                          className="form-control"
                          placeholder="12/28"
                          value={card.expiry}
                          onChange={(e) =>
                            setCard({ ...card, expiry: e.target.value })
                          }
                        />
                      </div>
                      <div className="col-md-3">
                        <label className="form-label">CVV</label>
                        <input
                          className="form-control"
                          placeholder="123"
                          value={card.cvv}
                          onChange={(e) =>
                            setCard({ ...card, cvv: e.target.value })
                          }
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label">UPI ID (VPA)</label>
                        <input
                          className="form-control"
                          placeholder="yourname@bank"
                          value={upi.vpa}
                          onChange={(e) => setUpi({ vpa: e.target.value })}
                        />
                      </div>
                      <div className="col-md-6 d-flex align-items-end">
                        <div className="small text-secondary">
                          We’ll open your UPI app to confirm the payment.
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="d-grid mt-4">
                  <button
                    className="btn btn-success btn-lg"
                    disabled={processing}
                  >
                    {processing
                      ? "Processing Payment…"
                      : `Confirm Payment ₹${total || 0}`}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Seat selection */}
          <div className="card">
            <div className="card-body">
              <h5 className="fw-bold mb-3">Select Seats</h5>

              <div className="seat-legend mb-3">
                <span className="badge text-bg-light"> Seats Status</span>
                <span className="badge text-bg-success">Selected</span>
                <span className="badge text-bg-danger">Booked</span>
                <span className="badge text-bg-secondary">Available</span>
              </div>

              <div className="seat-grid">
                <div className="seat-cell header">#</div>
                <div className="seat-cell header">A</div>
                <div className="seat-cell header">B</div>
                <div className="seat-cell aisle"></div>
                <div className="seat-cell header">C</div>
                <div className="seat-cell header">D</div>

                {layout.rows.map((row) => (
                  <React.Fragment key={row}>
                    <div className="seat-cell header">{row}</div>
                    {["A", "B"].map((col) => {
                      const seat = `${row}${col}`;
                      const isBooked = bus.bookedSeats.includes(seat);
                      const isSelected = selectedSeats.includes(seat);
                      const className = `seat-cell ${
                        isBooked ? "booked" : isSelected ? "selected" : ""
                      }`;
                      return (
                        <div
                          key={seat}
                          className={className}
                          onClick={() => toggleSeat(seat)}
                          title={seat}
                        >
                          {seat}
                        </div>
                      );
                    })}
                    <div className="seat-cell aisle"></div>
                    {["C", "D"].map((col) => {
                      const seat = `${row}${col}`;
                      const isBooked = bus.bookedSeats.includes(seat);
                      const isSelected = selectedSeats.includes(seat);
                      const className = `seat-cell ${
                        isBooked ? "booked" : isSelected ? "selected" : ""
                      }`;
                      return (
                        <div
                          key={seat}
                          className={className}
                          onClick={() => toggleSeat(seat)}
                          title={seat}
                        >
                          {seat}
                        </div>
                      );
                    })}
                  </React.Fragment>
                ))}
              </div>
              <div className="small mt-2 text-secondary">
                Click seats to select/deselect.
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card">
            <div className="card-body">
              <h6 className="fw-bold">Booking Summary</h6>
              <div className="small text-secondary">
                {bus.name} • {bus.type} •{" "}
                <span className="text-uppercase">{bus.source}</span>
              </div>
              <div className="small mt-2">
                Route: {bus.from} → {bus.to}
              </div>
              <div className="small">Departure: {bus.departure}</div>
              <div className="small mb-2">Arrival: {bus.arrival}</div>

              <hr />
              <div className="d-flex justify-content-between small">
                <span>Seat price</span>
                <span>₹{seatPrice}</span>
              </div>
              <div className="d-flex justify-content-between small">
                <span>Seats ({selectedSeats.length || 0})</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="d-flex justify-content-between small">
                <span>
                  Discount {couponState.valid && `(${coupon.toUpperCase()})`}
                </span>
                <span className="text-success">- ₹{discount}</span>
              </div>
              <hr className="mt-2 mb-2" />
              <div className="d-flex justify-content-between">
                <strong>Total</strong>
                <strong>₹{total}</strong>
              </div>
              <div className="small mt-2">
                Selected seats:{" "}
                {selectedSeats.length ? selectedSeats.join(", ") : "None"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
