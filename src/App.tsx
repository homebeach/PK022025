import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import MainArea from "./components/MainArea";
import NotFoundPage from "./components/NotFound"; // You need to create this component

import "./App.css";

const App = () => {
  return (
    <Router>
      <div className="App" style={{ display: "flex" }}>
        <Sidebar />
        <main style={{ flexGrow: 1, padding: 16 }}>
          <Routes>
            <Route path="/" element={<MainArea />} />
            <Route path="/:chartId" element={<MainArea />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
