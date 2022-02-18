import '@coreui/coreui/dist/css/coreui.min.css'
import './scss/app.scss';

import Header from './components/Header';
import Home from './views/Home';
import Consents from './views/Consents';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/consents" element={<Consents/>} />
          <Route path="/" element={<Home/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
