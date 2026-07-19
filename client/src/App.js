import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import TempleList from "./pages/TempleList";
import TempleDetails from "./pages/TempleDetails";
import BookTicket from "./pages/BookTicket";
import MyBookings from "./pages/MyBookings";
import AdminDashboard from "./pages/AdminDashboard";
import AddTemple from "./pages/AddTemple";
import EditTemple from "./pages/EditTemple";
import ManageTemples from "./pages/ManageTemples";
import ManageBookings from "./pages/ManageBookings";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Success from "./pages/Success";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/temples" element={<TempleList />} />

        <Route path="/temple/:id" element={<TempleDetails />} />
        <Route path="/profile" element={<Profile />} />

        <Route
          path="/book"
          element={
            <ProtectedRoute>
              <BookTicket />
            </ProtectedRoute>
          }
        />

        <Route path="/bookings" element={<MyBookings />} />

        <Route path="/admin" element={<AdminDashboard />} />

        <Route
          path="/admin/add-temple"
          element={<AddTemple />}
        />

        <Route
          path="/admin/manage-temples"
          element={<ManageTemples />}
        />

        <Route
          path="/admin/edit-temple/:id"
          element={<EditTemple />}
        />

        {/* 👇 NEW ROUTE */}
        <Route
          path="/admin/manage-bookings"
          element={<ManageBookings />}
        />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/success" element={<Success />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;