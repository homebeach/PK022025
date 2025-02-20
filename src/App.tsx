import Sidebar from "./components/Sidebar";
import MainArea from "./components/MainArea";

import "./App.css";

const App = () => {
  return (
    <div className="App" style={{ display: "flex" }}>
      <Sidebar />
      <main style={{ flexGrow: 1, padding: 16 }}>
        <MainArea />
      </main>
    </div>
  );
};

export default App;
