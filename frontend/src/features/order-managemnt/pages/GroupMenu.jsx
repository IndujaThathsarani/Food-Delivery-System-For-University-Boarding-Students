import React, { useEffect, useState } from "react";

const GroupMenu = ({ groupCode, memberName, onBackToGroups, onViewSummary }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [groupData, setGroupData] = useState(null);

  useEffect(() => {
    setMenuItems([
      {
        id: 1,
        name: "Bucket / 6PC",
        price: 3750,
        image:
          "https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: 2,
        name: "Quarter / 2Pc",
        price: 1400,
        image:
          "https://images.unsplash.com/photo-1518492104633-130d0cc84637?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: 3,
        name: "Half / 4Pc",
        price: 2600,
        image:
          "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: 4,
        name: "Full / 8Pc",
        price: 4950,
        image:
          "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80",
      },
    ]);
  }, []);

  const fetchGroup = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/group-orders/${groupCode}`);
      const data = await res.json();

      if (res.ok) {
        setGroupData(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (groupCode) {
      fetchGroup();
    }
  }, [groupCode]);

  const addToGroupCart = async (item) => {
    try {
      const response = await fetch("http://localhost:5000/api/group-orders/add-item", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          groupCode,
          item: {
            addedBy: memberName,
            itemId: item.id,
            name: item.name,
            price: item.price,
            qty: 1,
          },
        }),
      });

      if (response.ok) {
        fetchGroup();
      } else {
        alert("Failed to add item");
      }
    } catch (error) {
      console.error(error);
    }
  };

const updateItemQty = async (itemId, action) => {
  try {
    const response = await fetch("http://localhost:5000/api/group-orders/update-item", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        groupCode,
        itemId,
        action,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      fetchGroup();
    } else {
      alert(data.message || "Failed to update quantity");
    }
  } catch (error) {
    console.error(error);
    alert("Something went wrong");
  }
};

const removeItem = async (itemId) => {
  try {
    const response = await fetch("http://localhost:5000/api/group-orders/remove-item", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        groupCode,
        itemId,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      fetchGroup();
    } else {
      alert(data.message || "Failed to remove item");
    }
  } catch (error) {
    console.error(error);
    alert("Something went wrong");
  }
};

  const getSubTotal = () => {
    if (!groupData?.items?.length) return 0;
    return groupData.items.reduce((sum, item) => sum + item.price * item.qty, 0);
  };

  const deliveryFee = groupData?.deliveryFee || 400;
  const finalTotal = getSubTotal() + deliveryFee;

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

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_350px]">
      <div className="space-y-6">
        <div className="flex items-center justify-between rounded-2xl bg-white p-6 shadow">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Group Menu</h1>
            <p className="text-sm text-gray-500">
              Group Code: <span className="font-bold text-red-700">{groupCode}</span>
            </p>
            <p className="text-sm text-gray-500">
              Member: <span className="font-semibold">{memberName}</span>
            </p>
          </div>

          <button
            onClick={onBackToGroups}
            className="rounded-lg bg-gray-900 px-4 py-2 font-bold text-white hover:bg-black"
          >
            Back
          </button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3">
          {menuItems.map((item) => (
            <div key={item.id} className="rounded-2xl bg-white p-4 shadow">
              <img
                src={item.image}
                alt={item.name}
                className="mb-3 h-40 w-full rounded-lg object-cover"
              />

              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p className="text-gray-600">Rs. {item.price}</p>

              <button
                onClick={() => addToGroupCart(item)}
                className="mt-3 w-full rounded-lg bg-green-600 py-2 text-white hover:bg-green-700"
              >
                Add to Group Cart
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow h-fit sticky top-6">
        <h2 className="mb-6 text-2xl font-bold text-slate-800">Group Cart</h2>

        {!groupData?.items?.length ? (
          <p className="text-gray-500">Cart is empty</p>
        ) : (
          <>
            {groupData.items.map((item, index) => (
              <div key={index} className="mb-4 border-b pb-4">
                <h3 className="text-xl font-semibold text-slate-800">{item.name}</h3>

                <p className="mt-3 text-gray-500">Added By: {item.addedBy}</p>
                <p className="mt-2 text-gray-500">Price: Rs. {item.price}</p>
                <p className="mt-2 text-gray-500">Quantity: {item.qty}</p>

                <div className="mt-4 flex gap-3">
                 <button
  onClick={() => updateItemQty(item._id, "increase")}
  className="rounded-xl bg-green-600 px-4 py-2 font-bold text-white hover:bg-green-700"
>
  +
</button>

<button
  onClick={() => updateItemQty(item._id, "decrease")}
  className="rounded-xl bg-slate-700 px-4 py-2 font-bold text-white hover:bg-slate-800"
>
  -
</button>

<button
  onClick={() => removeItem(item._id)}
  className="rounded-xl bg-gray-200 px-4 py-2 font-bold text-slate-900 hover:bg-gray-300"
>
  Remove
</button>
                </div>
              </div>
            ))}

            <div className="border-t pt-4">
              <p className="mb-3 text-gray-600">Sub Total: Rs. {getSubTotal()}</p>
              <p className="mb-3 text-gray-600">Delivery Fee: Rs. {deliveryFee}</p>
              <h3 className="mb-5 text-2xl font-bold text-black">Total: Rs. {finalTotal}</h3>
            </div>

            <div className="mt-6 rounded-2xl bg-gray-50 p-4">
              <h3 className="mb-4 text-lg font-semibold text-slate-800">Bill Splitting</h3>

              {splitData.length === 0 ? (
                <p className="text-gray-500">No split data yet.</p>
              ) : (
                <div className="space-y-3">
                  {splitData.map((member, index) => (
                    <div key={index} className="rounded-lg border bg-white p-3">
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
                  <button
  onClick={onViewSummary}
  className="mt-4 w-full rounded-lg bg-red-700 py-3 font-bold text-white hover:bg-red-800"
>
  View Order Summary
</button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default GroupMenu;