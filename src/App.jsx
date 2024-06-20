import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/navbar';
import Footer from './components/footer';
import { Helmet } from 'react-helmet';
import SiteRoutes from './routes';

const App = () => {
  return (
    <div>
      <Helmet>
        <title>NorthFork Events</title>
      </Helmet>
      <Router>
        <Navbar />
        <SiteRoutes />
        <Footer />
      </Router>
    </div>
  );
};

export default App;