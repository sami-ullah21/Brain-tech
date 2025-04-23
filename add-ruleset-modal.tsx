"use client"

import { useState } from "react"
import { Modal, Input, Button } from "antd"

interface AddRulesetModalProps {
  open: boolean
  onClose: () => void
  onAdd: (name: string) => void
}

export default function AddRulesetModal({ open, onClose, onAdd }: AddRulesetModalProps) {
  const [rulesetName, setRulesetName] = useState("")

  const handleAdd = () => {
    if (rulesetName.trim()) {
      onAdd(rulesetName)
      setRulesetName("")
    }
  }

  return (
    <Modal
      title={<span style={{ fontSize: "24px", fontWeight: "normal" }}>Add Ruleset</span>}
      open={open}
      onCancel={onClose}
      footer={null}
      width={800}
      closeIcon={<span className="text-[24px] text-[#999]">×</span>}
      

    >
      <div className="py-[40px] mb-[40px]">
        <div className="mb-2.5 text-base text-gray-500">Ruleset Name:</div>
        <Input
          placeholder=""
          value={rulesetName}
          onChange={(e) => setRulesetName(e.target.value)}
          className="!border-0 !border-b !border-gray-300 !text-[16px] !rounded-none !px-[0px] !py-[8px]"
        />
      </div>

      <div className="flex justify-end gap-[12px]">
        <Button
          size="large"
          className="!bg-[#4a90e2] !text-white h-[44px] !w-[120px] !text-[16px] !text-base !border-none"
          onClick={onClose}
        >
          CLOSE
        </Button>
        <Button
          size="large"
          className="!bg-[#444] !text-white h-[44px] !w-[120px] !text-[16px] !text-base !border-none"
          onClick={handleAdd}
        >
          CREATE
        </Button>
      </div>
    </Modal>
  )
}
