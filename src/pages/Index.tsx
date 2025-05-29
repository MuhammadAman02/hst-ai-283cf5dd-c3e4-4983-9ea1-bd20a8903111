import React from 'react';
import { Button } from '@/components/ui/button';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500">
      <div className="text-center mb-8">
        <h1 className="text-6xl font-extrabold mb-6 text-white tracking-wider">
          WELCOME TO YOUR AMAZING APP
        </h1>
        <p className="text-2xl text-white mb-8">Get ready for an incredible experience!</p>
        <Button className="bg-white text-blue-600 hover:bg-blue-100 font-bold py-3 px-6 rounded-full text-lg transition duration-300 ease-in-out transform hover:scale-105">
          Start Your Journey
        </Button>
      </div>
    </div>
  );
};

export default Index;