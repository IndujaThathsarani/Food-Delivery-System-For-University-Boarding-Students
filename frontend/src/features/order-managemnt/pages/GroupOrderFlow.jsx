import React, { useState } from "react";
import GroupOrder from "./GroupOrder";
import GroupMenu from "./GroupMenu";
import GroupSummary from "./GroupSummary";

const STEPS = {
  ENTRY: "ENTRY",
  MENU: "MENU",
  SUMMARY: "SUMMARY",
};

const GroupOrderFlow = () => {
  const [step, setStep] = useState(STEPS.ENTRY);
  const [groupCode, setGroupCode] = useState("");
  const [memberName, setMemberName] = useState("");

  const handleEnterGroup = (nextGroupCode, nextMemberName) => {
    setGroupCode(nextGroupCode);
    setMemberName(nextMemberName);
    setStep(STEPS.MENU);
  };

  if (step === STEPS.SUMMARY) {
    return (
      <GroupSummary
        groupCode={groupCode}
        memberName={memberName}
        onBack={() => setStep(STEPS.MENU)}
      />
    );
  }

  if (step === STEPS.MENU) {
    return (
      <GroupMenu
        groupCode={groupCode}
        memberName={memberName}
        onBackToGroups={() => setStep(STEPS.ENTRY)}
        onViewSummary={() => setStep(STEPS.SUMMARY)}
      />
    );
  }

  return <GroupOrder onEnterGroup={handleEnterGroup} onBack={() => window.history.back()} />;
};

export default GroupOrderFlow;
