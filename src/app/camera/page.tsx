

"use client";
import React, { useState } from 'react';
import Link from 'next/link';

const Camera = () => {
  const [isVisible, setIsVisible] = useState(true); 

  const handleCancel = () => {
    
    setIsVisible(false); 
  };

  if (!isVisible) {
    return (
      <div className="flex-grow flex items-center justify-center">
        <p className="text-gray-700">Permission request canceled.</p>
        
        <Link href="/pwa/uploadimage">
          <button className="mt-4 px-4 py-2 bg-slate-900 text-white rounded-md">
            Go Back Home
          </button>
        </Link>
      </div>
    );
  }

  return (
    <main className="flex-grow flex items-center justify-center px-4 rounded-lg mt-80">
      <div className="bg-white p-6 w-full max-w-md rounded-lg shadow-xl ring-black ring-offset-1 shadow-black">
        <p className="text-center text-gray-700 mb-4">
          Bheta wants permission to use your camera
        </p>
        <div className="flex justify-between">
          <button
            className="px-4 py-2 border border-black rounded-md text-gray-700 hover:bg-gray-50"
            onClick={handleCancel} 
          >
            Cancel
          </button>
          <Link href="/camerapermission">
            <button className="px-4 py-2 bg-slate-900 text-white rounded-md">
              Allow
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Camera;



