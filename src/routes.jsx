import { Routes, Route } from "react-router-dom";
import RodeoEvents from './pages/RodeoEvents';
import Results from './pages/results';
import Home from './pages/home';
import EventPage from './pages/EventPage';
import PastRodeoEvents from './pages/PastRodeoEvents';
import Contact from './pages/contact';

const SiteRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<RodeoEvents />} />
            <Route path="/past-events" element={<PastRodeoEvents />} />
            <Route path="/results" element={<Results />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/event/:eventId" element={<EventPage />} />
        </Routes>
    );
};

export default SiteRoutes;