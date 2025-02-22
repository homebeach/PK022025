import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import MainArea from "./components/MainArea";
import "./App.css";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Sidebar />
        <main className="MainArea">
          <Routes>
            <Route path="/" element={<MainArea />} />
            <Route path="/:chartId" element={<MainArea />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
