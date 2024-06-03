import React, { useState } from 'react';
import supabase from '../utils/supabase';
import ReCAPTCHA from 'react-google-recaptcha';

const SignupForm = ({ activities }) => {
    const [selectedActivity, setSelectedActivity] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [captchaResponse, setCaptchaResponse] = useState(null);

    const onCaptchaChange = (value) => {
        setCaptchaResponse(value);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!captchaResponse) {
            console.log('Please verify the captcha');
            return;
        }

        // Insert into participants table
        let { data: participant, error } = await supabase
            .from('participants')
            .insert([
                { first_name: firstName, last_name: lastName, email: email, phone: phone }
            ])
            .select();
        console.log('Participant:', participant);
        if (error || !participant) {
            console.log('Error inserting participant:', error);
            return;
        }

        // Get the id of the inserted participant
        const participantId = participant[0].participant_id;

        // Insert into activity_participants table
        let { data: activityParticipant, error: apError } = await supabase
            .from('activity_participants')
            .insert([
                { participant_id: participantId, activity_id: selectedActivity }
            ]);

        if (apError) {
            console.log('Error inserting activity participant:', apError);
            return;
        }

        console.log(`Signed up for activity: ${selectedActivity}`);
        setIsSubmitted(true);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="font-bold text-xl mb-2">Sign Up for an Activity</h2>
            <p className="text-red-500">* indicates a required field</p>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
                    First Name *
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="firstName" type="text" value={firstName} onChange={e => setFirstName(e.target.value)} required />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
                    Last Name *
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="lastName" type="text" value={lastName} onChange={e => setLastName(e.target.value)} required />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    Email *
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                    Phone Number *
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="phone" type="tel" value={phone} onChange={e => setPhone(e.target.value)} required />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="activity">
                    Select an activity *
                </label>
                <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="activity" value={selectedActivity} onChange={e => setSelectedActivity(e.target.value)} required>
                    {activities.map(activity => (
                        <option key={activity.activity_id} value={activity.activity_id}>{activity.activity_name}</option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <ReCAPTCHA
                    sitekey="6Lfr_u8pAAAAAEubidwNDvRAqm9_eMqFCvjP3nDB"
                    onChange={onCaptchaChange}
                />
            </div>
            <div className="flex items-center justify-between">
                {isSubmitted ? (
                    <p className="bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" >Submited You will be receiving an email with more information.</p>
                ) : (
                    <button className="bg-red-500 hover:bg-red-300 transition-colors text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Sign Up
                    </button>
                )}
            </div>
        </form>
    );
};

export default SignupForm;