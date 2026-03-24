import React, { useState } from "react";

const GroupOrder = ({ onEnterGroup }) => {
  const [title, setTitle] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [deadline, setDeadline] = useState("");

  const [joinName, setJoinName] = useState("");
  const [joinCode, setJoinCode] = useState("");

  const [message, setMessage] = useState("");

  const minDateTime = new Date().toISOString().slice(0, 16);

const isWithinAllowedTime = () => {
  const now = new Date();

  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const startMinutes = 8 * 60;   // 8:00 AM
  const endMinutes = 22 * 60;    // 10:00 PM

  return currentMinutes >= startMinutes && currentMinutes <= endMinutes;
};

  // CREATE GROUP
const handleCreateGroup = async () => {
  const now = new Date();
  const currentTimeText = now.toLocaleTimeString();

 // if (!isWithinAllowedTime()) {
  //  setMessage(
  //    `⏰ Group orders are allowed only between 8:00 AM – 10:00 PM. Current time: ${currentTimeText}`
  //  );
  //  console.log("Current browser time:", new Date().toString());
   // return;
  //}

  if (!title || !createdBy || !deadline) {
    setMessage("⚠️ Please fill all required fields.");
    return;
  }

  if (deadline < minDateTime) {
    setMessage("⚠️ Please select a valid future date and time.");
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/api/group-orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title.trim(),
        createdBy: createdBy.trim(),
        deadline,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      setMessage("✅ Group created!");
      onEnterGroup(data.groupOrder.groupCode, createdBy.trim());
    } else {
      setMessage(data.message || "❌ Failed to create group");
    }
  } catch (error) {
    console.error(error);
    setMessage("❌ Something went wrong");
  }
};

  // JOIN GROUP
  const handleJoinGroup = async () => {
    if (!joinCode || !joinName) {
      setMessage("⚠️ Enter group code and your name.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/group-orders/join",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            groupCode: joinCode,
            name: joinName,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("✅ Joined group!");
        onEnterGroup(joinCode, joinName); // navigate
      } else {
        setMessage(data.message || "❌ Failed to join group");
      }
    } catch (error) {
      console.error(error);
      setMessage("❌ Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-2xl space-y-6">

        <h1 className="text-3xl font-bold text-gray-800">
          Group Ordering
        </h1>

        <p className="text-sm text-gray-500">
          ⏰ Available: 8:00 AM – 10:00 PM
        </p>

        {/* CREATE */}
        <div className="rounded-2xl bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-semibold">Create Group</h2>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Order Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg border px-4 py-3"
            />

            <input
              type="text"
              placeholder="Your Name"
              value={createdBy}
              onChange={(e) => setCreatedBy(e.target.value)}
              className="w-full rounded-lg border px-4 py-3"
            />

            <input
              type="datetime-local"
              value={deadline}
              min={minDateTime}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full rounded-lg border px-4 py-3"
            />

            <button
              onClick={handleCreateGroup}
              className="w-full rounded-lg bg-red-700 py-3 font-bold text-white hover:bg-red-800"
            >
              Create Group
            </button>
          </div>
        </div>

        {/* JOIN */}
        <div className="rounded-2xl bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-semibold">Join Group</h2>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Group Code"
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
              className="w-full rounded-lg border px-4 py-3"
            />

            <input
              type="text"
              placeholder="Your Name"
              value={joinName}
              onChange={(e) => setJoinName(e.target.value)}
              className="w-full rounded-lg border px-4 py-3"
            />

            <button
              onClick={handleJoinGroup}
              className="w-full rounded-lg bg-gray-900 py-3 font-bold text-white hover:bg-black"
            >
              Join Group
            </button>
          </div>
        </div>

        {/* MESSAGE */}
        {message && (
          <div className="rounded-lg bg-blue-50 p-3 text-center text-blue-700">
            {message}
          </div>
        )}

      </div>
    </div>
  );
};

export default GroupOrder;