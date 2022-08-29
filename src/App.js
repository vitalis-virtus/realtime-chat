import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <div className="layout">
          <AppRouter />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
