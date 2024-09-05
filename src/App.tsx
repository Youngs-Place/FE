import React from "react";
import Map from "./Map";
import {BrowserRouter as Router} from 'react-router-dom';

const App: React.FC = () => {
  return (
    <Router>
      <Map />
    </Router>
  );
}

export default App;
