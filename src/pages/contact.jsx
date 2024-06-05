import React from 'react';

const Contact = () => {
    return (
        <div>
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl text-center pt-8 md:text-6xl">Get in Touch</h1>
            <div className="min-h-screen mx-auto bg-grey-100 p-10 rounded-lg shadow-md text-center">
                <div className='flex justify-center'>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-center space-y-4 sm:space-y-0 sm:space-x-10 w-full sm:w-1/2 p-4">
                        <div className="flex flex-col items-start space-y-2">
                            <h2 className="text-3xl font-bold mb-1">Phone</h2>
                            <p className="text-lg transition-colors hover:text-customRed"><a href="tel:6056416237">(605) 641-6237</a></p>
                        </div>
                        <div className="flex flex-col items-start space-y-2">
                            <h2 className="text-3xl font-bold mb-1">Email</h2>
                            <p className="text-lg transition-colors hover:text-customRed"><a href="mailto:Derek@barbarv.com">Derek@barbarv.com</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;