










import React from "react";
import "./App.css";
import IncidentDashboard from "./components/IncidentDashboard";

// Import Font Awesome
import "font-awesome/css/font-awesome.min.css";

function App() {
  return (
    <div className="App">
      <IncidentDashboard />

      <footer className="footer">
        <div className="social-links">
          <a href="https://github.com/DUDEKULARAHIM" target="_blank" rel="noopener noreferrer">
            <i className="fa fa-github" aria-hidden="true"></i>
          </a>
          <a href="https://www.linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">
            <i className="fa fa-linkedin" aria-hidden="true"></i>
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
