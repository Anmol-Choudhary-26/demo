import React from "react";
import BusinessProposalsCard from "./BusinessProposalsCard";

const handleAccept = () => {
  console.log("Accepted the investment offer.");
  // Additional logic for accept
};

const handleReject = () => {
  console.log("Rejected the investment offer.");
  // Additional logic for reject
};

const handleChat = () => {
  console.log("Opening chat...");
  // Additional logic for chat
};

const BusinessProposals = () => {
  return (
    <div>
      <BusinessProposalsCard
        onAccept={handleAccept}
        onReject={handleReject}
        onChat={handleChat}
      />
      <BusinessProposalsCard
        onAccept={handleAccept}
        onReject={handleReject}
        onChat={handleChat}
      />
      <BusinessProposalsCard
        onAccept={handleAccept}
        onReject={handleReject}
        onChat={handleChat}
      />
      <BusinessProposalsCard
        onAccept={handleAccept}
        onReject={handleReject}
        onChat={handleChat}
      />
      <BusinessProposalsCard
        onAccept={handleAccept}
        onReject={handleReject}
        onChat={handleChat}
      />
      <BusinessProposalsCard
        onAccept={handleAccept}
        onReject={handleReject}
        onChat={handleChat}
      />
      <BusinessProposalsCard
        onAccept={handleAccept}
        onReject={handleReject}
        onChat={handleChat}
      />
      <BusinessProposalsCard
        onAccept={handleAccept}
        onReject={handleReject}
        onChat={handleChat}
      />
    </div>
  );
};

export default BusinessProposals;
