import React from 'react';

const Loader = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <img src="/loading.png" alt="Spinning Image" className="animate-spin w-32 h-32" />
    </div>
  );
}

export default Loader;
