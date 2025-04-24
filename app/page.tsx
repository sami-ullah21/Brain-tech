"use client"

import RuleEditor from "../components/rule-editor"

export default function Home() {
  const sampleRuleset = {
    name: "Default Ruleset",
    rules: [
      {
        id: "rule-1",
        name: "Sample Rule",
        conditions: [],
        action: "Make Shipping Free",
        overrideShipping: "No",
        afterMatch: "Stop Processing Global Rules",
      },
    ],
  }

  const handleSave = (ruleset: any) => {
    console.log("Saving ruleset:", ruleset)
    // Here you would typically send this data to your backend
  }

  return <RuleEditor ruleset={sampleRuleset} onSave={handleSave} />
}
