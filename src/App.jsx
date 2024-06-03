import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import RodeoEvents from './pages/RodeoEvents';
import Results from './pages/results';
import Home from './pages/home';
import EventPage from './pages/EventPage';
import Footer from './components/footer';

const App = () => {
  return (
    <div>
      <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<RodeoEvents />} />
          <Route path="/results" element={<Results />} />
          <Route path="/event/:eventId" element={<EventPage />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
};

export default App;