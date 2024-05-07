import "./App.css";
import Test from "./pages/Test/Test";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Levels from "./pages/Levels/Levels";
import Result from "./pages/Result/Result";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container">
        <div className="main">
          <Routes>
            <Route path="/" element={<Levels />} />
            <Route path="/:levelid" element={<Test />} />
            <Route path="/:levelid/:mistakes" element={<Result />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
