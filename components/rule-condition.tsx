import type { Condition, RuleGroup } from "../types/rule-types"

interface RuleConditionProps {
  condition: Condition | RuleGroup
}

export default function RuleCondition({ condition }: RuleConditionProps) {
  if (condition.type === "group") {
    return (
      <div className="pl-4 border-l-2 border-gray-300 mb-2">
        <div className="flex items-center mb-2">
          <span className="text-gray-500 mr-2">{condition.operator}</span>
        </div>
        {condition.conditions.map((subCondition) => (
          <RuleCondition key={subCondition.id} condition={subCondition} />
        ))}
      </div>
    )
  }

  return (
    <div className="flex items-center mb-2">
      <div className="relative w-full">
        <select
          defaultValue={condition.operator}
          className="w-full border border-gray-300 rounded p-2 pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="---">---</option>
          <option value="equals">equals</option>
          <option value="contains">contains</option>
          <option value="starts_with">starts with</option>
          <option value="ends_with">ends with</option>
          <option value="greater_than">greater than</option>
          <option value="less_than">less than</option>
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
  )
}
