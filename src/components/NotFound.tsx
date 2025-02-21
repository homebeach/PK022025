import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white text-center p-6">
      <h1 className="text-9xl font-bold text-gray-200 relative">
        404
        <span className="absolute inset-x-0 bottom-5 text-blue-600 text-6xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-24 h-24"
          >
            <polyline points="2 12 6 8 10 12 14 8 18 12 22 8" />
          </svg>
        </span>
      </h1>
      <p className="text-lg text-gray-600 mt-4">Page not found. Please try again later.</p>
      <Button className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md" onClick={() => navigate("/")}>Go Home</Button>
    </div>
  );
};

export default NotFound;
