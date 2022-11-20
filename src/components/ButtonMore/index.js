import React from 'react';

export default function Index({ setpage, page }) {
  return (
    <div className="relative mt-4">
      <div className="relative flex justify-center items-center">
        <button
          onClick={() => setpage(page + 1)}
          className="relative flex justify-center items-center bg-blue-600 font-semibold text-white px-4 py-2.5 h-fit rounded-md w-full">
          Load More
        </button>
      </div>
    </div>
  );
}
