import React from 'react'

export default function Loadingdash() {
    return (
        <div className="flex items-center justify-center ">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="bg-gray-200 p-4 rounded-md animate-pulse">
                <div className="h-8 bg-gray-300 rounded mb-4"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
  )
}
