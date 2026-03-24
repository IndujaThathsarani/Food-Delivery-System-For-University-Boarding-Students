import React, { useEffect, useState } from "react";

const GroupSummary = ({ groupCode, memberName, onBack }) => {
  const [groupData, setGroupData] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [loading, setLoading] = useState(false);

  const fetchGroup = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/group-orders/${groupCode}`);
      const data = await res.json();

      if (res.ok) {
        setGroupData(data);

        if (data.paymentMethod) {
          setPaymentMethod(data.paymentMethod);
        }
      } else {
        alert(data.message || "Failed to fetch group summary");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  useEffect(() => {
    if (groupCode) {
      fetchGroup();
    }
  }, [groupCode]);

  const getSubTotal = () => {
    if (!groupData?.items?.length) return 0;
    return groupData.items.reduce((sum, item) => sum + item.price * item.qty, 0);
  };

  const deliveryFee = groupData?.deliveryFee || 400;
  const finalTotal = groupData?.finalTotal || getSubTotal() + deliveryFee;

  const calculateSplit = () => {
    if (!groupData?.items?.length) return [];

    const memberTotals = {};

    groupData.items.forEach((item) => {
      const total = item.price * item.qty;

      if (!memberTotals[item.addedBy]) {
        memberTotals[item.addedBy] = 0;
      }

      memberTotals[item.addedBy] += total;
    });

    const members = Object.keys(memberTotals);
    const deliveryShare = members.length > 0 ? deliveryFee / members.length : 0;

    return members.map((member) => ({
      name: member,
      subTotal: memberTotals[member],
      delivery: deliveryShare,
      total: memberTotals[member] + deliveryShare,
    }));
  };

  const splitData = calculateSplit();

  const isLeader = groupData?.createdBy === memberName;
  const isCompleted = groupData?.status === "Completed";

  const finalizeGroupOrder = async () => {
    if (!groupData?.items?.length) {
      alert("Please add items before completing the group order.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("http://localhost:5000/api/group-orders/finalize", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          groupCode,
          paymentMethod,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("✅ Group order placed successfully!");
        fetchGroup();
      } else {
        alert(data.message || "Failed to finalize group order");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="flex items-center justify-between rounded-2xl bg-white p-6 shadow">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Group Order Summary</h1>
            <p className="text-sm text-gray-500">
              Group Code: <span className="font-bold text-red-700">{groupCode}</span>
            </p>
            <p className="text-sm text-gray-500">
              Status: <span className="font-semibold">{groupData?.status || "Loading..."}</span>
            </p>
          </div>

          <button
            onClick={onBack}
            className="rounded-lg bg-gray-900 px-4 py-2 font-bold text-white hover:bg-black"
          >
            Back to Group Menu
          </button>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-semibold">Shared Items</h2>

          {!groupData?.items?.length ? (
            <p className="text-gray-500">No items added yet.</p>
          ) : (
            <div className="space-y-3">
              {groupData.items.map((item, index) => (
                <div key={index} className="rounded-lg border p-4">
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-500">Added by {item.addedBy}</p>
                  <p className="text-sm text-gray-600">
                    Rs. {item.price} × {item.qty}
                  </p>
                  <p className="font-bold text-red-700">
                    Rs. {item.price * item.qty}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-2xl bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-semibold">Order Totals</h2>

          <p className="mb-2 text-gray-600">Sub Total: Rs. {getSubTotal()}</p>
          <p className="mb-2 text-gray-600">Delivery Fee: Rs. {deliveryFee}</p>
          <h3 className="text-2xl font-bold text-black">Final Total: Rs. {finalTotal}</h3>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-semibold">Bill Splitting</h2>

          {splitData.length === 0 ? (
            <p className="text-gray-500">No split data yet.</p>
          ) : (
            <div className="space-y-3">
              {splitData.map((member, index) => (
                <div key={index} className="rounded-lg border p-4">
                  <p className="font-semibold">{member.name}</p>
                  <p className="text-sm text-gray-600">
                    Subtotal: Rs. {member.subTotal}
                  </p>
                  <p className="text-sm text-gray-600">
                    Delivery Share: Rs. {member.delivery.toFixed(2)}
                  </p>
                  <p className="font-bold text-red-700">
                    Total: Rs. {member.total.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-2xl bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-semibold">Payment Method</h2>

          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            disabled={isCompleted}
            className="w-full rounded-lg border px-4 py-3 disabled:bg-gray-100 disabled:text-gray-500"
          >
            <option>Cash on Delivery</option>
            <option>Card Payment</option>
          </select>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow">
          {isLeader && !isCompleted && (
            <button
              onClick={finalizeGroupOrder}
              disabled={loading}
              className="w-full rounded-lg bg-red-700 py-3 font-bold text-white hover:bg-red-800 disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              {loading ? "Processing..." : "Pay & Complete Group Order"}
            </button>
          )}

          {!isLeader && !isCompleted && (
            <p className="text-sm text-gray-500">
              Only the group leader can finalize this order.
            </p>
          )}

          {isCompleted && (
            <div className="space-y-2">
              <p className="rounded-lg bg-green-50 p-3 text-center font-semibold text-green-700">
                ✅ This group order has been completed.
              </p>
              <p className="text-sm text-gray-600">
                Payment Method:{" "}
                <span className="font-semibold">
                  {groupData?.paymentMethod || paymentMethod}
                </span>
              </p>
              <p className="text-sm text-gray-600">
                Payment Status:{" "}
                <span className="font-semibold">
                  {groupData?.paymentStatus || "Paid"}
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GroupSummary;