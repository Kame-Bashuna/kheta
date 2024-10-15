"use client";
import React from 'react';
import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';

const Landing = () => {
  const [] = useState(false); 
  
  return (
    <>
    <div className="flex flex-col mt-[5%]">
      <main className="flex-grow overflow-y-auto pt-16 pb-20 flex items-center justify-center bg-white text-lg md:text-xl p-4">
        <div className="flex flex-col md:flex-row w-full max-w-5xl md:space-x-32">
          <div className="w-full md:w-1/2 mb-8 md:mb-0">
            <div className="bg-gray-200 rounded-lg overflow-hidden">
              <Image
                src="/images/drug.png"
                alt="Drug packaging example"
                width={1600}
                height={800}
                className="w-full"
              />
            </div>
          </div>
          
          <div className="w-full md:w-1/2 flex flex-col justify-between">
            <div className='w-full mb-4'>
              <p className="text-base md:text-lg lg:text-2xl ">
                Please take a <span className="font-bold">clear</span> and well-lit picture of the drug 
                packaging where the <span className="font-bold">batch number</span> is printed.
              </p>
              <p className="text-base md:text-lg lg:text-2xl">
                Make sure the entire batch number is <span className="font-bold">fully visible</span> 
                and in focus, avoiding any glare or obstructions that 
                could obscure the text.
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 md:gap-40 mb-4 md:mb-0">
                <Link href='/pwa/uploadimage'>
              <button className="w-full md:w-auto px-8 py-3 border-black ring-offset-1 ring-black shadow-black bg-transparent border-2 text-gray-700 rounded">
                Back
              </button>
              </Link>
              
              <Link href="/camera">
                <button className="w-full md:w-auto px-6 py-3 bg-slate-900 text-white rounded transition-colors">
                  Take a picture
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
    </>
  );
};

export default Landing;
