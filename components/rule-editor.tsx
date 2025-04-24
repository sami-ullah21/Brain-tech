"use client"

import { useState } from "react"
import RuleCondition from "./rule-condition"
import type { Rule } from "../types/rule-types"

interface RuleEditorProps {
  ruleset: {
    name: string
    rules: Rule[]
  }
  onSave: (ruleset: any) => void
}

export default function RuleEditor({ ruleset, onSave }: RuleEditorProps) {
  const [rules, setRules] = useState<Rule[]>(ruleset.rules || [])
  const [ruleName, setRuleName] = useState("")

  const addFilter = () => {
    const newRule: Rule = {
      id: `rule-${Date.now()}`,
      name: ruleName || `Rule ${rules.length + 1}`,
      conditions: [],
      action: "Make Shipping Free",
      overrideShipping: "No",
      afterMatch: "Stop Processing Global Rules",
    }
    setRules([...rules, newRule])
    setRuleName("")
  }

  const addRuleCondition = (ruleId: string) => {
    setRules(
      rules.map((rule) => {
        if (rule.id === ruleId) {
          return {
            ...rule,
            conditions: [
              ...rule.conditions,
              {
                id: `condition-${Date.now()}`,
                type: "condition",
                operator: "---",
                value: "",
              },
            ],
          }
        }
        return rule
      }),
    )
  }

  const addRuleGroup = (ruleId: string) => {
    setRules(
      rules.map((rule) => {
        if (rule.id === ruleId) {
          return {
            ...rule,
            conditions: [
              ...rule.conditions,
              {
                id: `group-${Date.now()}`,
                type: "group",
                operator: "AND",
                conditions: [],
              },
            ],
          }
        }
        return rule
      }),
    )
  }

  const deleteRule = (ruleId: string) => {
    setRules(rules.filter((rule) => rule.id !== ruleId))
  }

  const updateRuleAction = (ruleId: string, field: string, value: string) => {
    setRules(
      rules.map((rule) => {
        if (rule.id === ruleId) {
          return {
            ...rule,
            [field]: value,
          }
        }
        return rule
      }),
    )
  }

  const handleSaveAll = () => {
    onSave({
      ...ruleset,
      rules,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-600">
      <div className="max-w-6xl mx-auto p-4">
        {/* Header */}
        <h1 className="text-2xl font-bold text-white mb-8">Global Ruleset - {ruleset.name}</h1>

        {/* Main content */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
          <div className="p-4 border-b flex justify-between items-center">
            <p className="text-gray-700">
              These rules will be evaluated in order, and stop their execution once there is a match.
            </p>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center"
              onClick={handleSaveAll}
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                />
              </svg>
              SAVE ALL
            </button>
          </div>

          {/* Add Filter Button */}
          <div className="p-4">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded uppercase text-sm font-medium"
              onClick={addFilter}
            >
              ADD FILTER
            </button>
          </div>

          {/* Rules List */}
          <div className="p-4">
            {rules.map((rule, index) => (
              <div key={rule.id} className="mb-8 border-b pb-6">
                <div className="flex items-center mb-4">
                  <span className="text-gray-500 mr-4">#{index + 1}</span>
                  <span className="text-gray-500">Rule Name (200 chars max)</span>
                </div>

                <div className="mb-6">
                  <label className="block text-gray-500 mb-2">Name</label>
                  <input
                    type="text"
                    value={rule.name}
                    onChange={(e) => updateRuleAction(rule.id, "name", e.target.value)}
                    className="w-full border-b border-t-0 border-l-0 border-r-0 border-gray-300 focus:border-blue-500 focus:ring-0 py-2"
                    maxLength={200}
                  />
                </div>

                {/* Rule Conditions */}
                <div className="bg-gray-100 border border-gray-200 rounded-md p-4 mb-6">
                  <div className="flex mb-4">
                    <button
                      className={`mr-2 px-3 py-1 rounded ${
                        rule.conditions.length > 0 &&
                        rule.conditions[0].type === "group" &&
                        rule.conditions[0].operator === "AND"
                          ? "bg-gray-300"
                          : "bg-gray-200"
                      }`}
                    >
                      AND
                    </button>
                    <button
                      className={`px-3 py-1 rounded ${
                        rule.conditions.length > 0 &&
                        rule.conditions[0].type === "group" &&
                        rule.conditions[0].operator === "OR"
                          ? "bg-gray-300"
                          : "bg-gray-200"
                      }`}
                    >
                      OR
                    </button>
                  </div>

                  {rule.conditions.map((condition) => (
                    <RuleCondition key={condition.id} condition={condition} />
                  ))}

                  <div className="flex mt-4">
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded mr-2 flex items-center text-sm"
                      onClick={() => addRuleCondition(rule.id)}
                    >
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                      ADD RULE
                    </button>
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded mr-2 flex items-center text-sm"
                      onClick={() => addRuleGroup(rule.id)}
                    >
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                      ADD GROUP
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded flex items-center text-sm"
                      onClick={() => deleteRule(rule.id)}
                    >
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                      DELETE
                    </button>
                  </div>
                </div>

                {/* Action Settings */}
                <div className="mb-6">
                  <label className="block text-gray-500 mb-2">Action When Query Matches</label>
                  <div className="relative">
                    <select
                      value={rule.action}
                      onChange={(e) => updateRuleAction(rule.id, "action", e.target.value)}
                      className="w-full border border-gray-300 rounded p-2 pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Make Shipping Free">Make Shipping Free</option>
                      <option value="Apply Discount">Apply Discount</option>
                      <option value="Change Shipping Method">Change Shipping Method</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-gray-500 mb-2">Override Shipping Name & Description</label>
                  <div className="relative">
                    <select
                      value={rule.overrideShipping}
                      onChange={(e) => updateRuleAction(rule.id, "overrideShipping", e.target.value)}
                      className="w-full border border-gray-300 rounded p-2 pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="No">No</option>
                      <option value="Yes">Yes</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-gray-500 mb-2">After Query Matches</label>
                  <div className="relative">
                    <select
                      value={rule.afterMatch}
                      onChange={(e) => updateRuleAction(rule.id, "afterMatch", e.target.value)}
                      className="w-full border border-gray-300 rounded p-2 pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Stop Processing Global Rules">Stop Processing Global Rules</option>
                      <option value="Continue Processing">Continue Processing</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end">
                  <button className="p-2 text-gray-500 hover:text-gray-700 mr-2">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </button>
                  <button className="p-2 text-gray-500 hover:text-gray-700 mr-2">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  </button>
                  <button className="p-2 text-red-500 hover:text-red-700">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
