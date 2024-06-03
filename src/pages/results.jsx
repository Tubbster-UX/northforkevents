import React, { useState, useEffect } from 'react';
import { Select, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Tab } from '@material-ui/core';
import supabase from '../utils/supabase';

function ResultsPage({ hideEventSelector = false, eventId }) {
    const [events, setEvents] = useState([]);
    const [activities, setActivities] = useState([]);
    const [results, setResults] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(eventId || '');
    const [selectedActivity, setSelectedActivity] = useState('');

    useEffect(() => {
        fetchEvents();
        if (eventId) {
            fetchActivities(eventId);
        }
    }, []);

    const fetchEvents = async () => {
        let { data: events, error } = await supabase.from('events').select('*');
        if (error) console.log('Data fetch error: ', error); else setEvents(events);
    };

    const fetchActivities = async (eventId) => {
        let { data: activities, error } = await supabase.from('activities').select('*').eq('event_id', eventId);
        if (error) console.log('Data fetch error: ', error); else setActivities(activities);
    };

    const fetchResults = async (activityId) => {
        let { data: results, error } = await supabase
            .from('results')
            .select('position, score, time_taken, participants (first_name, last_name)')
            .eq('activity_id', activityId)
            .order('position', { ascending: true });
        if (error) console.log('Data fetch error: ', error); else setResults(results);
    };

    const handleEventChange = (event) => {
        setSelectedEvent(event.target.value);
        fetchActivities(event.target.value);
    };

    const handleActivityChange = (event) => {
        setSelectedActivity(event.target.value);
        fetchResults(event.target.value);
    };

    return (
        <div className='h-screen p-8'>
            <div className='flex flex-col md:flex-row'>
                {!hideEventSelector && (
                    <div className='flex flex-col'>
                        <label htmlFor="event-select">Select Event:</label>
                        <Select id="event-select" className='ml-5 min-w-44 mr-8' value={selectedEvent} onChange={handleEventChange}>
                            {events.map((event) => (
                                <MenuItem value={event.event_id}>{event.event_name} ({new Date(event.event_date).toLocaleDateString()})</MenuItem>
                            ))}
                        </Select>
                    </div>
                )}
                <div className='flex flex-col'>
                    <label htmlFor="activity-select">Select Activity:</label>
                    <Select id="activity-select" className='ml-5 min-w-44' value={selectedActivity} onChange={handleActivityChange}>
                        {activities.map((activity) => (
                            <MenuItem value={activity.activity_id}>{activity.activity_name}</MenuItem>
                        ))}
                    </Select>
                </div>
            </div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Athlete</TableCell>
                            <TableCell>Position</TableCell>
                            <TableCell>Score</TableCell>
                            <TableCell>Time</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {results.map((result) => (
                            <TableRow>
                                <TableCell>{result.participants.first_name} {result.participants.last_name}</TableCell>
                                <TableCell>{result.position}</TableCell>
                                <TableCell>{result.score}</TableCell>
                                <TableCell>{result.time_taken}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default ResultsPage;