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

  if (!window.SpeechRecognition || !window.SpeechGrammarList) {
    return (
      <div className="d-flex flex-column w-100 h-100 justify-content-center align-items-center">
        <h5 className="text-center">
          Your browser does not support Speech Recognition.
        </h5>
        <h5>Try Google chrome instead. </h5>
        <p>Thank you!</p>
      </div>
    );
  }

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
