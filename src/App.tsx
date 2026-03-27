// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Feedback from "./pages/Feedback";
import AdminFeedbacks from "./pages/adminFeedbacks";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-[#fafafa] text-slate-900 selection:bg-sky-100">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/admin/feedbacks" element={<AdminFeedbacks />} />
      </Routes>
    </div>
  );
}

export default function Root() {
  return (
    <BrowserRouter basename="/tiantian-personal-website/">
      <App />
    </BrowserRouter>
  );
}
