import React, { useRef } from 'react';
import Button from './button';

const Hero = () => (
    <div className="relative h-screen text-white overflow-hidden flex flex-col items-center justify-center">
        <div className="absolute inset-0">
            <video autoPlay muted loop id="myVideo" className="object-cover object-center w-full h-full">
                <source src="/rodeo.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
        <div className="z-10 text-center">
            <h1 className="text-6xl font-extrabold mb-4">North Fork Events</h1>
            <p className="text-3xl mb-8">Experience the thrill of the ride</p>
            <Button href="#events" text="View Upcoming Events" />
        </div>
    </div>
);

export default Hero;