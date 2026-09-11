import React from 'react'

export default function Unauthorized() {
  return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-red-600">
                    403
                </h1>

                <h2 className="mt-4 text-2xl font-semibold text-gray-800">
                    Unauthorized
                </h2>

                <p className="mt-2 text-gray-500">
                    You do not have permission to access this page.
                </p>
            </div>
        </div>
    );
}