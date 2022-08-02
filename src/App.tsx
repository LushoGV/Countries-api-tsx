import { BrowserRouter, Route, Routes } from "react-router-dom";
import CountryPage from "./components/CountryPage";
import Home from "./components/Home";
import Navbar from "./components/Navbar";

const App: React.FC = () => {
  return (
    <div className="flex flex-col items-center">
      <BrowserRouter>
      <Navbar />
      <main className="px-0 md:px-5 max-w-screen-xl w-full">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:country" element={<CountryPage/>} />
      </Routes>
      </main>
    </BrowserRouter>
    </div>
  );
};

export default App;
