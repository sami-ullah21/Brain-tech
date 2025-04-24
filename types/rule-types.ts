export interface Condition {
    id: string
    type: "condition"
    operator: string
    value: string
  }
  
  export interface RuleGroup {
    id: string
    type: "group"
    operator: "AND" | "OR"
    conditions: (Condition | RuleGroup)[]
  }
  
  export interface Rule {
    id: string
    name: string
    conditions: (Condition | RuleGroup)[]
    action: string
    overrideShipping: string
    afterMatch: string
  }
  