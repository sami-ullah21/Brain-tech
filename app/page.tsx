"use client";

import { useState } from "react";
import ShippingHero from "../shipping-hero";
import GlobalRulesets from "../global-rulesets";
import AddRulesetModal from "@/add-ruleset-modal";

export default function Page() {
  const [currentPage, setCurrentPage] = useState<"hero" | "rulesets" | "modal">(
    "hero"
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <div>
      <div className="bg-gray-800 p-4">
        <div className="max-w-6xl mx-auto flex space-x-4">
          <button
            className={`px-4 py-2 rounded ${
              currentPage === "hero"
                ? "bg-blue-500 text-white"
                : "bg-gray-700 text-gray-300"
            }`}
            onClick={() => setCurrentPage("hero")}
          >
            Shipping Hero
          </button>
          <button
            className={`px-4 py-2 rounded ${
              currentPage === "rulesets"
                ? "bg-blue-500 text-white"
                : "bg-gray-700 text-gray-300"
            }`}
            onClick={() => setCurrentPage("rulesets")}
          >
            Global Rulesets
          </button>

          <button
            className={`px-4 py-2 rounded ${
              currentPage === "modal"
                ? "bg-blue-500 text-white"
                : "bg-gray-700 text-gray-300"
            }`}
            onClick={() => {
              setCurrentPage("modal");
              setIsModalOpen(true);
            }}
          >
            Show Modal
          </button>
        </div>
      </div>

      {currentPage === "hero" ? <ShippingHero /> : <GlobalRulesets />}
      <AddRulesetModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={() => {
          //
        }}
      />
    </div>
  );
}
