import axios from "axios";
import { routes, thirdPartyRoutes, offers } from "./mockData";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export async function searchBuses({ from, to }) {
  await delay(300);
  const all = [...(routes || []), ...(thirdPartyRoutes || [])];
  const f = all.filter(
    (r) =>
      (!from || r.from.toLowerCase().includes(String(from).toLowerCase())) &&
      (!to || r.to.toLowerCase().includes(String(to).toLowerCase()))
  );
  return f;
}

export async function fetchBus(id) {
  await delay(200);
  return [...routes, ...thirdPartyRoutes].find((r) => r.id === id);
}

export function validateCoupon(code) {
  if (!code) return { valid: false, message: "Enter a coupon code." };
  const found = offers.find((o) => o.code.toUpperCase() === code.toUpperCase());
  if (!found) return { valid: false, message: "Invalid coupon." };
  return {
    valid: true,
    kind: found.kind,
    value: found.value,
    message: `Applied ${found.code}`,
  };
}

export function generatePNR() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let s = "";
  for (let i = 0; i < 6; i++)
    s += chars[Math.floor(Math.random() * chars.length)];
  return s;
}

export async function pay(amount, payload) {
  await delay(700);
  // (In a real app, call gateway SDK/API here.)
  return {
    status: "success",
    transactionId: "TXN" + Math.floor(Math.random() * 1e6),
    pnr: generatePNR(),
    amount,
    method: payload?.method || "CARD",
    payload,
  };
}

async function tryThirdParty(url) {
  try {
    const r = await axios.get(url, { timeout: 2000 });
    return r.data;
  } catch {
    return null;
  }
}

export async function tryRedbusSample() {
  return await tryThirdParty("https://jsonplaceholder.typicode.com/posts/1");
}
export async function tryZingbusSample() {
  return await tryThirdParty("https://jsonplaceholder.typicode.com/posts/2");
}
