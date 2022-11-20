import React from 'react';

export default function Index({ data }) {
  return (
    <div className="relative bg-white border border-gray-400 p-4">
      {/* Heading Content */}
      <div className="relative mb-4 pb-3 border-b  border-gray-300">
        <p className="text-base font-medium text-gray-400">
          {data?.type} / {data?.location}
        </p>
        <h1 className="text-xl font-bold text-gray-800">{data?.title}</h1>
      </div>

      {/* Content */}
      <div className="relative flex gap-4 box-border ">
        <div
          className="relative w-2/3 box-border overflow-x-hidden overflow-auto"
          dangerouslySetInnerHTML={{ __html: data.description }}></div>

        <div className="relativ w-1/3">
          {/* Logo Company */}
          <div className="relative border-4 border-gray-300">
            <div className="p-4 border border-gray-300">
              <h1 className="text-lg font-semibold text-gray-800">
                {data?.company}
              </h1>
            </div>

            <img
              src={data?.company_logo}
              alt=""
              className="relative object-cover h-64 w-full rounded-md"
            />
          </div>

          {/* How to apply */}
          <div className="relative bg-yellow-100 border-4 border-yellow-600/40 mt-8">
            <div className="p-4 border-b border-gray-300">
              <h1 className="text-lg font-semibold text-gray-800">
                How to apply
              </h1>
            </div>

            <div className="relative box-border w-full text-ellipsis whitespace-pre-wrap flex flex-wrap">
              <div
                className="relative w-full float-left font-medium leading-relaxed text-sm text-gray-600 p-4 whitespace-pre-line text-clip overflow-auto"
                dangerouslySetInnerHTML={{ __html: data.how_to_apply }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
