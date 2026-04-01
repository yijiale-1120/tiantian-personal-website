// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthProvider.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import Home from "./pages/Home.tsx";
import Feedback from "./pages/Feedback.tsx";
import AdminFeedbacks from "./pages/adminFeedbacks.tsx";
import Login from "./pages/Login.tsx";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 text-slate-900 selection:bg-sky-100">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route
          path="/admin/feedbacks"
          element={
            <ProtectedRoute>
              <AdminFeedbacks />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default function Root() {
  return (
    <BrowserRouter basename="/tiantian-personal-website/">
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  );
}
