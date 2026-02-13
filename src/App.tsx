import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "@/pages/Dashboard";
import Digest from "@/pages/Digest";
import Proof from "@/pages/Proof";
import Saved from "@/pages/Saved";
import Settings from "@/pages/Settings";
import Landing from "@/pages/Landing";
import Ship from "@/pages/Ship";
import NotFound from "@/pages/NotFound";

const STORAGE_KEY = "jobTrackerTestChecklist";

function isShipUnlocked(): boolean {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return false;

  const checklist = JSON.parse(stored);
  return Object.values(checklist).every(Boolean);
}

function ShipGuard() {
  return isShipUnlocked() ? <Ship /> : <Navigate to="/jt/07-test" replace />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/saved" element={<Saved />} />
        <Route path="/digest" element={<Digest />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/jt/07-test" element={<Proof />} />
        <Route path="/jt/08-ship" element={<ShipGuard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
