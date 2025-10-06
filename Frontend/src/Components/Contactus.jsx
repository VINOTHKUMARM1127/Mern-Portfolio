import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

export const Contactus = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('vinothkumarm1127', 'temp1127', form.current, {
        publicKey: 'sPqSnFHboBAhwkjun',
      })
      .then(
        () => {
          alert('Mail Send');
          form.current.reset();
        },
        (error) => {
            alert('Mail Did not Send');
        },
      );
  };

  return (
    <section>
    <div className="text-center text-[2em] font-bold mt-8 mb-1">Contact</div>
    <div className="text-center text-[1.2em] opacity-55 mt-5 mb-10 px-10">
    Feel free to reach out to me for any questions or opportunities!
      </div>
    <form
      ref={form}
      onSubmit={sendEmail}
      className="w-[70%] lg:w-[40%]  mx-auto p-6 bg-[#171721] shadow-md rounded-xl space-y-4 text-white"
    >
        <div className='text-[1.3em] font-extrabold'>Email Me!</div>
      <div>
        <input
          type="text"
          name="name"
          required
          className="bg-[#171721] w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder='Name'
        />
      </div>
  
      <div>
        <input
          type="email"
          name="email"
          required
          className="bg-[#171721] w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder='Email'
        />
      </div>

      <div>
        <textarea
          name="subject"
          required
          className="bg-[#171721] w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-15 resize-none"
          placeholder='Subject'
        />
      </div>
  
      <div>
        <textarea
          name="message"
          required
          className="bg-[#171721] w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-28 resize-none"
          placeholder='Message'
        />
      </div>
  
      <input
        type="submit"
        value="Send"
        className="w-full bg-gradient-to-r from-purple-800 to-blue-800 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 cursor-pointer"
      />
    </form>
    </section>
  );
  
};