
"use client"

import { AiOutlineCloseCircle } from "react-icons/ai";
import { FiEdit, FiTrash2, FiCopy, FiCheck, FiPlus } from "react-icons/fi"

export default function GlobalRulesets() {
  const rulesets = [
    {
      name: "Default Ruleset",
      filters: 0,
      enabled: true,
      createdAgo: "1 week ago",
    },
    {
      name: "DFY Shipping Rules (Retail / F+S)",
      filters: 8,
      enabled: false,
      createdAgo: "1 week ago",
    },
    {
      name: "$100+ FREE Shipping Rules & (Retail / F+S)",
      filters: 7,
      enabled: false,
      createdAgo: "1 week ago",
    },
    {
      name: "DFY Shipping Rules — Sacrifice Retail Rates if Free Items in Cart (Retail OR F+S)",
      filters: 5,
      enabled: false,
      createdAgo: "1 week ago",
    },
    {
      name: "DFY Shipping Rules — ($100+ FREE Retail Shipping) Sacrifice Retail Rates if Free Items in Cart (Retail OR F+S)",
      filters: 6,
      enabled: false,
      createdAgo: "1 week ago",
    },
    {
      name: "$5 Flash Sale",
      filters: 3,
      enabled: false,
      createdAgo: "1 week ago",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-600 p-3 md:p-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto">
        <h1 className="text-xl md:text-2xl font-bold text-white mb-6 md:mb-12 ml-2">Global Rulesets</h1>

        {/* Add ruleset button - positioned outside the container */}
        <div className="mb-4 ml-2">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded shadow uppercase text-xs md:text-sm flex items-center">
            <FiPlus className="mr-1" /> Add Ruleset
          </button>
        </div>

        {/* Main content */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-3 md:p-4 border-b">
            <p className="text-gray-700 text-sm md:text-base">You can have one ruleset enabled at a time.</p>
          </div>

          {/* Rulesets list */}
          {rulesets.map((ruleset, index) => (
            <div
              key={index}
              className={`${
                index !== rulesets.length - 1 ? "border-b" : ""
              } p-3 md:p-4 flex flex-col md:flex-row md:items-center md:justify-between`}
            >
              <div className="mb-2 md:mb-0 md:mr-4 md:flex-1">
                <h3 className="font-medium text-gray-900 text-sm md:text-base break-words">{ruleset.name}</h3>
                <p className="text-gray-500 text-xs md:text-sm">Contains {ruleset.filters} filters.</p>
              </div>

              <div className="flex flex-col md:flex-row md:items-center">
                <span className="text-xs md:text-sm text-gray-500 mb-2 md:mb-0 md:mr-4">
                  Created {ruleset.createdAgo}
                </span>

                <div className="flex items-center space-x-3">
                  <button className="text-gray-400 hover:text-gray-600 p-1.5" aria-label="Edit">
                    <FiEdit size={16} />
                  </button>
                  <button
                    className={`p-1.5 ${
                      ruleset.enabled ? "text-green-500 hover:text-green-600" : "text-red-500 hover:text-red-600"
                    }`}
                    aria-label={ruleset.enabled ? "Enabled" : "Disabled"}
                  >
                    {ruleset.enabled ? <FiCheck size={16} /> : <AiOutlineCloseCircle size={16} />}
                  </button>
                  <button className="text-gray-400 hover:text-gray-600 p-1.5" aria-label="Duplicate">
                    <FiCopy size={16} />
                  </button>
                  <button className="text-gray-400 hover:text-gray-600 p-1.5" aria-label="Delete">
                    <FiTrash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
