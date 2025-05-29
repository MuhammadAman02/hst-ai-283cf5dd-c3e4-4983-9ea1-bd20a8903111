import React from 'react';
import { Button } from '@/components/ui/button';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 text-blue-900">Welcome to Your App</h1>
        <p className="text-xl text-blue-700 mb-8">Start building your amazing project here!</p>
        <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default Index;