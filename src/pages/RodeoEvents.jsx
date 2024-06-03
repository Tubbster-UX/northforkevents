import React, { useEffect, useState } from 'react';
import supabase from '@/utils/supabase';
import { EventCard } from '../components/event-card';
import { Spin, Alert } from 'antd'; // Ant Design components
import Pagination from '../components/pagination';

const RodeoEvents = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [eventsPerPage] = useState(4);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            let { data: events, error: eventsError } = await supabase
                .from('events')
                .select('*');
            if (eventsError) throw eventsError;

            const eventIds = events.map(event => event.event_id);

            let { data: activities, error: activitiesError } = await supabase
                .from('activities')
                .select('*')
                .in('event_id', eventIds);

            if (activitiesError) throw activitiesError;

            const eventsWithActivities = events.map(event => {
                const eventActivities = activities.filter(activity => activity.event_id === event.event_id);
                return {
                    ...event,
                    activities: eventActivities
                };
            });

            // Sort events by date
            eventsWithActivities.sort((a, b) => new Date(a.event_date) - new Date(b.event_date));

            setEvents(eventsWithActivities);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    // Get current events
    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div>
            {loading ? (
                <Spin size="large" />
            ) : error ? (
                <Alert message={error} type="error" />
            ) : (
                <>
                    <div id='events' className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mx-auto px-4 py-14 w-full h-full place-items-center">
                        {currentEvents.map((event, index) => (
                            <EventCard event={event} className="w-full" />
                        ))}
                    </div>
                    <div className="flex justify-center mt-4">
                        <Pagination
                            currentPage={currentPage}
                            total={events.length}
                            pageSize={eventsPerPage}
                            onChange={paginate}
                        />
                    </div>
                </>
            )
            }
        </div >
    );
};

export default RodeoEvents;