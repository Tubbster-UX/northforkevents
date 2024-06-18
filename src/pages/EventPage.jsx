import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import supabase from '../utils/supabase';
import SignupForm from '../components/signup-form';
import ResultsPage from './results';
import { Helmet } from 'react-helmet';
import Modal from 'react-modal';

const EventPage = () => {
    const { eventId } = useParams();
    const [event, setEvent] = useState(null);
    const [activities, setActivities] = useState([]);
    const [sponsors, setSponsors] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);


    useEffect(() => {
        fetchEvent();
        fetchActivities();
        fetchSponsors();
    }, [eventId]);

    const fetchEvent = async () => {
        let { data: event, error } = await supabase
            .from('events')
            .select('*')
            .eq('event_id', eventId)
            .single();

        if (error) console.log("Error: ", error);
        else setEvent(event);
    };

    const fetchActivities = async () => {
        let { data: activities, error } = await supabase
            .from('activities')
            .select('*')
            .eq('event_id', eventId);

        if (error) console.log("Error: ", error);
        else setActivities(activities);
    };

    const fetchSponsors = async () => {
        let { data: sponsordata, error } = await supabase
            .from('event_sponsors')
            .select('*')
            .eq('event_id', eventId);
        let { data: sponsors, error: sponsorError } = await supabase.from('sponsors').select('*').in('sponsor_id', sponsordata.map(sponsor => sponsor.sponsor_id));
        if (error) console.log("Error: ", error);
        else if (sponsorError) console.log("Error: ", sponsorError);
        else setSponsors(sponsors);
    };

    if (!event) return <div className='flex flex-col m-20 min-h-96 items-center justify-center'>
        <div className='loader' ></div>
        <p className="text-center pt-8">Loading Event...</p>
    </div>;

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <Helmet>
                <title>NorthFork Events - {event ? event.event_name : 'Loading...'} - {event ? event.event_date : 'Loading...'}</title>
            </Helmet>
            <div className="text-center bg-cover bg-center">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">{event.event_name}</h1>
                <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">{event.location}</p>
                <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                    {
                        (() => {
                            const [year, month, day] = event.event_date.split('-');
                            return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: '2-digit' }).format(new Date(year, month - 1, day));
                        })()
                    }
                </p>
            </div>
            <div>
                <div className="flex flex-col lg:flex-row justify-between mt-8">
                    <div className="w-full lg:w-1/2">
                        <div className="mt-10">
                            <h2 className="text-2xl tracking-tight font-extrabold text-gray-900 sm:text-3xl md:text-4xl">Activities:</h2>
                            <ul className="mt-2 text-md text-gray-500">
                                {activities.map(activity => (
                                    <li key={activity.activity_id}>{activity.activity_name} - ${activity.price} </li>
                                ))}
                            </ul>
                        </div>
                        <div className="mt-10">
                            <h2 className="text-2xl tracking-tight font-extrabold text-gray-900 sm:text-3xl md:text-4xl">Sponsors:</h2>
                            {sponsors.length > 0 ? (
                                <ul className="mt-2 text-base text-gray-500">
                                    {sponsors.map(sponsor => (
                                        <div key={sponsor.sponsor_id}>
                                            <Link to={sponsor.url} className="">
                                            <img
                                                src={sponsor.logoUrl}
                                                alt={sponsor.name}
                                                className="w-1/2 h-auto cursor-pointer"
                                            />
                                            </Link>
                                        </div>
                                    ))}
                                </ul>
                            ) : (
                                <p className="mt-2 text-base text-gray-500">No sponsors for this event.</p>
                            )}
                        </div>
                    </div>
                    <div className="w-full lg:w-1/5 mx-auto mt-8">
                        <img
                            src={event.posterUrl}
                            alt={event.event_name}
                            className="w-full h-auto cursor-pointer"
                            onClick={() => setModalIsOpen(true)}
                        />

                        <Modal
                            isOpen={modalIsOpen}
                            onRequestClose={() => setModalIsOpen(false)}
                            contentLabel="Event Poster"
                        >
                            <img src={event.posterUrl} alt={event.event_name} className="w-full h-auto" />
                            <button onClick={() => setModalIsOpen(false)}>Close</button>
                        </Modal>
                    </div>
                </div>
            </div>
            <ResultsPage eventId={event.event_id} hideEventSelector="true" />
        </div>
    );
};

export default EventPage;