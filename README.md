# 🚌 Swift Bus – Online Bus Booking App (React + Redux + Vite)

Swift Bus is a **fully functional frontend bus booking application** built with  
[React](https://react.dev/), [Redux](https://redux.js.org/), [Bootstrap](https://getbootstrap.com/), [React Router](https://reactrouter.com/), and [Vite](https://vitejs.dev/).  
It simulates real-world bus booking platforms like **Redbus, Zingbus with a **dummy payment gateway** and interactive UI.

## 🚀 Features

- 🔍 **Search & Filter Trips** (From, To, Date, Passengers)  
- 🚌 **Bus Operators & Trip Listings** (dummy API + mock third-party data)  
- 💺 **Seat Selection** with real-time pricing  
- 👤 **Passenger Details Form**  
- 🎟️ **Coupons & Discounts** 
- 💳 **Dummy Payment Gateway** (Success/Failure simulation)  
- 📜 **Booking History (Persisted with LocalStorage)**  
- 🎨 **Bootstrap 5 + Bootstrap Icons** for modern UI  
- ⚡ Powered by **React Redux (without Redux Toolkit)** and custom thunk middleware  

---

## 🛠️ Installation & Setup
1.Clone the Repository
```bash
git clone https://github.com/SuryanshuShekhar/swift-bus.git
cd swift-bus

2. Install Dependencies
npm install

3. Run Locally (Vite Dev Server)
npm run dev

🧪 Dummy API & Payment
Trip data is fetched from mock JSON APIs (src/api/mockData.js)
Simulated integration with Redbus / Zingbus(dummy data only)
Payment is a dummy modal that confirms with a success/failure message

📚 Tech Stack
Frontend: React 19, Vite, Bootstrap 5, React Router, React Icons
State Management: Redux (without Toolkit), Redux Thunk
API: Axios + Dummy Data
Styling: Bootstrap

✨Future Improvements
User Authentication
Real Bus Operator APIs
Real Payment Gateway Integration (Razorpay/Stripe)
Multi-language Support
Responsive PWA support


👨‍💻 Developed with ❤️ using React + Redux + Vite
