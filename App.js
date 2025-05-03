import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './Dashboard';
import Viewer from './Viewer';

export default function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Dashboard</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/viewer/:id" element={<Viewer />} />
      </Routes>
    </Router>
  );
}
