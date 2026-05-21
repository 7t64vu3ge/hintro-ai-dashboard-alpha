import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import FeedbackHistory from "./pages/FeedbackHistory/FeedbackHistory";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/feedback-history" element={<FeedbackHistory />} />
    </Routes>
  );
}

export default App;
