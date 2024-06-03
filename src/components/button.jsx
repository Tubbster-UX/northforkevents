import React from 'react';

const Button = ({ href, text }) => {
    return (
        <a href={href} className="mt-8 bg-transparent border border-customRed hover:border-white hover:bg-customRed text-white font-bold py-2 px-4 rounded-full transition-colors duration-200">{text}</a>
    );
};

export default Button;