import Sidebar from "./components/Sidebar";
import "./App.css";

const App = () => {
  return (
    <div className="App" style={{ display: "flex" }}>
      <Sidebar />
      <main style={{ flexGrow: 1, padding: 16 }}>
        <h1>Welcome to the Chart App</h1>
      </main>
    </div>
  );
};

export default App;
