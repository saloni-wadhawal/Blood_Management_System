import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddDonor from "./pages/AddDonor";
import DonorList from "./pages/DonorList";
import ProtectedRoute from "./pages/ProtectedRoute";
import Layout from "./components/Layout";
import { Toaster } from "react-hot-toast";
import RequestList from "./pages/RequestList";
import RequestForm from "./pages/RequestForm";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
     <Routes>

  {/* 🔓 PUBLIC ROUTES */}
  <Route path="/" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/request-blood" element={<RequestForm />} />
  {/* 🔒 PROTECTED ROUTES */}
  <Route
    path="/dashboard"
    element={
      <ProtectedRoute>
        <Layout>
          <Dashboard />
        </Layout>
      </ProtectedRoute>
    }
  />

  <Route
    path="/add-donor"
    element={
      <ProtectedRoute>
        <Layout>
          <AddDonor />
        </Layout>
      </ProtectedRoute>
    }
  />

  <Route
    path="/donors"
    element={
      <ProtectedRoute>
        <Layout>
          <DonorList />
        </Layout>
      </ProtectedRoute>
    }
  />

  {/* ✅ FIXED */}
  <Route
    path="/requests"
    element={
      <ProtectedRoute>
        <Layout>
          <RequestList />
        </Layout>
      </ProtectedRoute>
    }
  />

</Routes>
    </BrowserRouter>
  );
}

export default App;