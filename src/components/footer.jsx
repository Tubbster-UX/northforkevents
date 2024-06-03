import React from 'react';

const Footer = () => (
<footer className="relative bg-brown-400 text-white mt-8 pt-8 pb-10">
    <div className="container mx-auto px-4">
      <div className="sm:flex sm:mt-8">
        <div className="mt-8 sm:mt-0 sm:w-full sm:px-8 flex flex-col md:flex-row justify-between">
          <div className="flex flex-col">
            <span className="font-bold uppercase mb-2">About</span>
            <span className="my-2"><a href="#" className="text-red-500 text-md hover:text-red-300">The Rodeo</a></span>
            <span className="my-2"><a href="#" className="text-red-500  text-md hover:text-red-300">History</a></span>
            <span className="my-2"><a href="#" className="text-red-500  text-md hover:text-red-300">Team</a></span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold uppercase mt-4 md:mt-0 mb-2">Events</span>
            <span className="my-2"><a href="#" className="text-red-500 text-md hover:text-red-300">Upcoming Events</a></span>
            <span className="my-2"><a href="#" className="text-red-500 text-md hover:text-red-300">Past Events</a></span>
            <span className="my-2"><a href="#" className="text-red-500 text-md hover:text-red-300">Tickets</a></span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold uppercase mt-4 md:mt-0 mb-2">Contact</span>
            <span className="my-2"><a href="#" className="text-red-500 text-md hover:text-red-300">Email</a></span>
            <span className="my-2"><a href="#" className="text-red-500 text-md hover:text-red-300">Phone</a></span>
            <span className="my-2"><a href="#" className="text-red-500 text-md hover:text-red-300">Address</a></span>
          </div>
        </div>
      </div>
      <div className="flex items-center mt-6">
        <div className="flex gap-4">
          <a href="#"><i className="fab fa-facebook text-red-500 text-2xl hover:text-red-300"></i></a>
          <a href="#"><i className="fab fa-twitter text-red-500 text-2xl hover:text-red-300"></i></a>
          <a href="#"><i className="fab fa-instagram text-red-500 text-2xl hover:text-red-300"></i></a>
        </div>
        <div className="ml-auto">
          <p className="text-sm text-gray-500">©{new Date().getFullYear()} North Fork Events</p>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;