import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import RodeoEvents from './pages/RodeoEvents';
import Results from './pages/results';
import Home from './pages/home';
import EventPage from './pages/EventPage';
import PastRodeoEvents from './pages/PastRodeoEvents';
import Footer from './components/footer';
import Contact from './pages/contact';
import { Helmet } from 'react-helmet';

const App = () => {
  return (
    <div>
      <Helmet>
        <title>NorthFork Events</title>
      </Helmet>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<RodeoEvents />} />
          <Route path="/past-events" element={<PastRodeoEvents />} />
          <Route path="/results" element={<Results />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/event/:eventId" element={<EventPage />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;