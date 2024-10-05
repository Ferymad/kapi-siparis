import React from 'react';

function ErrorDisplay({ message }) {
  return (
    <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
      <h2 className="text-lg font-semibold mb-2">Error</h2>
      <p>{message}</p>
    </div>
  );
}

export default ErrorDisplay;