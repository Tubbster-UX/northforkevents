import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
<footer className="relative bg-brown-400 text-white pt-8 pb-10">
    <div className="container mx-auto px-4">
      <div className="sm:flex sm:mt-8">
        <div className="mt-8 sm:mt-0 sm:w-full sm:px-8 flex flex-col md:flex-row justify-around">
          <div className="flex flex-col">
            <span className="font-bold uppercase mt-4 md:mt-0 mb-2">Events</span>
            <span className="my-2"><Link to={"/events"} className="text-red-500 text-md hover:text-red-300">Upcoming Events</Link></span>
            <span className="my-2"><Link to={"/past-events"} className="text-red-500 text-md hover:text-red-300">Past Events</Link></span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold uppercase mt-4 md:mt-0 mb-2">Contact</span>
            <span className="my-2"><a href="mailto:derek@barbarv.com" className="text-red-500 text-md hover:text-red-300">Derek@barbarv.com</a></span>
            <span className="my-2"><a href="tel:6056416237" className="text-red-500 text-md hover:text-red-300">(605) 641-6237</a></span>
          </div>
        </div>
      </div>
      <div className="flex items-center mt-6">
    <div className="ml-auto">
        <p className="text-sm text-gray-500">
            ©{new Date().getFullYear()} North Fork Events | <a href='https://brinkdesign.co' className='text-customRed transition-all hover:opacity-50'>Designed by Brink Design Co.</a>
        </p>
    </div>
</div>
    </div>
  </footer>
);

export default Footer;