"use client"

import { FiEdit } from "react-icons/fi"
import { FaBox } from "react-icons/fa"

export default function ShippingHero() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col items-center justify-center p-4">
      {/* Logo */}
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 mr-2 text-white">
          <FaBox className="w-full h-full" />
        </div>
        <h1 className="text-2xl font-bold text-white">
          Shipping <span className="text-green-500">Hero</span>
        </h1>
      </div> 

      {/* Green line */}
      <div className="w-full h-0.5 bg-green-500 mb-8"></div>

      {/* Welcome text */}
      <h2 className="text-3xl font-bold text-white mb-2 text-center">WELCOME TO SHIPPING HERO!</h2>
      <p className="text-white text-lg mb-8 text-center">Please watch the training video below</p>

      {/* Video container */}
      <div className="w-full max-w-3xl bg-white rounded-lg overflow-hidden mb-6">
        {/* Actual video player */}
        <video className="w-full" controls poster="/placeholder.svg?height=400&width=800">
          {/* Replace the src with your actual video URL */}
          <source src="YOUR_VIDEO_URL_HERE" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Settings text */}
      <p className="text-white text-sm mb-4 text-center">
        You might want to disable ShippingHero in your{" "}
        <a href="#" className="underline text-white">
          Shipping Settings
        </a>{" "}
        if you haven't setup any rules yet.
      </p>

      {/* Edit rules button */}
      <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded flex items-center">
        <FiEdit className="w-4 h-4 mr-2" />
        EDIT RULES
      </button>
    </div>
  )
}
