import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavItem = ({ to, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`block mt-4 lg:inline-block lg:mt-0 text-red-500 text-md hover:text-red-300 mr-6 ${isActive ? 'font-black' : ''}`}
    >
      {children}
    </Link>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const routes = [
    { path: "/events", title: "Rodeo Events" },
    { path: "/results", title: "Results" },
    { path: "/schedule", title: "Schedule" },
    { path: "/about-us", title: "About Us" },
    { path: "/contact", title: "Contact" },
  ];

  return (
    <div>
      <nav className="flex items-center justify-between flex-wrap bg-brown-400 p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <Link to='/' className="font-semibold text-xl tracking-tight"><img src='/wlogo.png' className='h-24' /></Link>
        </div>
        <div className="block lg:hidden">
          <button onClick={toggleMenu} className="flex items-center px-3 py-2 border rounded text-red-500 text-md">
            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v15z" /></svg>
          </button>
        </div>
        {/* Desktop */}
        <div className="w-full hidden lg:flex lg:items-center lg:w-auto lg:justify-center">
          <div className="text-lg lg:flex lg:justify-center">
          {routes.map((route) => (
            <NavItem key={route.path} to={route.path}>
              {route.title}
            </NavItem>
          ))}
          </div>
        </div>
      </nav>

      {/* Mobile */}
      <div className={`${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-200 ease-in-out flex lg:hidden items-center justify-between flex-wrap bg-brown-400 pl-6 pb-6 w-full z-50 absolute lg:items-center lg:w-auto lg:justify-center`}>
        <div className="text-lg lg:flex lg:justify-center">
          {routes.map((route) => (
            <NavItem key={route.path} to={route.path}>
              {route.title}
            </NavItem>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;