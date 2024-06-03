import { Link } from "react-router-dom";

export const EventCard = ({ event, index }) => {

    const formatDate = (dateString) => {
        const [year, month, day] = dateString.split('-').map(Number);
        const date = new Date(year, month - 1, day);
        if (isNaN(date.getTime())) {
            // dateString does not represent a valid date
            return 'Invalid Date';
        }
        const options = { month: 'short', day: 'numeric' };
        return date.toLocaleDateString(undefined, options).toUpperCase();
    };

    return (

        <div key={index} className="relative bg-gray-300 flex my-5 flex-col h-80 w-full md:w-96 justify-between">

            <div className="bg-red-700 absolute text-white p-2 min-w-16 min-h-16 flex flex-col items-center justify-center">
                {formatDate(event.event_date).split(' ').reverse().map((part, index) => (
                    <span key={index} className={index === 0 ? "text-3xl font-bold text-center" : "text-xl font-bold text-center"}>
                        {part}
                    </span>
                ))}
            </div>
            <Link to={`/event/${event.event_id}`}>
            <div><img className="h-80 object-cover" src={event.image} /></div>



            <div className="bg-yellow-900 absolute bottom-0 bg-opacity-60 w-full min-h-32 p-4 flex flex-col justify-between">
                <h1 className="text-2xl font-bold text-white">{event.event_name}</h1>
                <p className="text-white">{event.location}</p>
            </div>
            </Link>
        </div >

    );
};