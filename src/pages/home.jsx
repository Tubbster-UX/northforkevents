import React, { useEffect, useState } from 'react';
import { EventCard } from '../components/event-card';
import supabase from '@/utils/supabase';
import Hero from '../components/hero';
import Button from '../components/button';

function Home() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        let { data: events, error: eventsError } = await supabase
            .from('events')
            .select('*');
        console.log("Events: ", events);
        if (eventsError) console.log("Error: ", eventsError);

        const eventIds = events.map(event => event.event_id);

        let { data: activities, error: activitiesError } = await supabase
            .from('activities')
            .select('*')
            .in('event_id', eventIds);

        if (activitiesError) console.log("Error: ", activitiesError);

        const eventsWithActivities = events.map(event => {
            const eventActivities = activities.filter(activity => activity.event_id === event.event_id);
            return {
                ...event,
                activities: eventActivities
            };
        });

        // Sort events by date
        eventsWithActivities.sort((a, b) => new Date(a.event_date) - new Date(b.event_date));

        // Get the first 3 events
        const firstThreeEvents = eventsWithActivities.slice(0, 3);

        setEvents(firstThreeEvents);
    };

    return (
        <div>
            <Hero />
            <div
              id='events'   className='bg-[url("/pattern.jpg")] h-full bg-no-repeat bg-center bg-cover p-5'
            >
                <div className='flex justify-center items-center flex-col'>
                    {/* Title */}
                    <h1
                        className='text-4xl md:text-5xl font-black text-center py-10 uppercase text-white'
                    >
                        Upcoming Events
                    </h1>

                </div>

                <div className='flex justify-center gap-4'>
                    {events.map((event, index) => (
                        <EventCard key={index} event={event} className="w-full" />
                    ))}
                </div>
                <div className='flex justify-center items-center'>
                    <Button href="/events" text="View All Events" />
                </div>
            </div>
        </div>
    );
}

export default Home;