import React from 'react';

export default function Index({ dataJobs, loading, user }) {
  return (
    <div className="relative flex justify-center items-center h-96">
      <h1 className="text-2xl font-bold text-gray-800">
        {dataJobs?.length === 0 && loading
          ? 'Loading'
          : user?.name
          ? 'No Data'
          : 'Please Login to continue'}
      </h1>
    </div>
  );
}
