import moment from 'moment';
import React from 'react';

export default function Index({ handlerDetailDataJobs, job }) {
  return (
    <div
      onClick={() => handlerDetailDataJobs(job?.id)}
      className="relative -mt-1 py-2  flex justify-between items-center hover:bg-zinc-100 transition-all duration-300 cursor-pointer">
      <div className="relative">
        <h1 className="text-blue-600 font-semibold text-lg leading-relaxed">
          {job?.title}
        </h1>
        <p className="text-base font-medium leading-relaxed mt-0.5">
          <span className="text-gray-400">{job?.company} - </span>
          <span className="text-green-600">{job?.type}</span>
        </p>
      </div>
      <div className="relative text-right">
        <h4 className="font-semibold text-sm text-gray-800">{job?.location}</h4>
        <p className="text-sm font-normal text-gray-400">
          {job?.created_at
            ? moment(new Date(job?.created_at).toISOString()).fromNow()
            : ''}
        </p>
      </div>
    </div>
  );
}
