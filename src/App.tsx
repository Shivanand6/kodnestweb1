import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "@/pages/Dashboard";
import Digest from "@/pages/Digest";
import Proof from "@/pages/Proof";
import FinalProof from "@/pages/FinalProof";
import Saved from "@/pages/Saved";
import Settings from "@/pages/Settings";
import Landing from "@/pages/Landing";
import Ship from "@/pages/Ship";
import NotFound from "@/pages/NotFound";

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
        <Route path="/jt/08-ship" element={<Ship />} />
        <Route path="/jt/proof" element={<FinalProof />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
