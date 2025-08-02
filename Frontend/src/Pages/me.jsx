import React from 'react';

const AboutPage = () => {
  return (
    <section className="min-h-fit md:overflow-hidden py-12 px-4 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-6">About ChatsWhat</h1>
        
        <p className="mb-4 text-lg leading-relaxed">
          <strong>ChatsWhat</strong> is a modern chat application built with a focus on speed, simplicity, and security.
          It allows users to sign up, upload profile pictures, and interact in real-time. This app is developed using the
          MERN stack (MongoDB, Express, React, Node.js) with a beautiful and responsive UI powered by Tailwind CSS.
        </p>

        <p className="mb-4 text-lg leading-relaxed">
          It also supports dark mode and is optimized for mobile and desktop usage. Whether you're chatting with friends or
          using it for lightweight team collaboration, ChatsWhat provides a fast and intuitive experience.
        </p>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-2">Built By</h2>
          <p className="text-lg">Prathamesh Powar — passionate about clean UI, efficient code, and modern web technology.</p>
        </div>

        <div className="mt-10 border-t pt-4 text-sm text-gray-500 dark:text-gray-400">
          &copy; {new Date().getFullYear()} ChatsWhat. All rights reserved.
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
