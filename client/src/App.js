import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Routes from "./router/Routes";
function App() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <Routes/>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default App;
