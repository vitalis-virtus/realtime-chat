import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

import "./styles/components/App.scss";

const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <AppRouter />
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
