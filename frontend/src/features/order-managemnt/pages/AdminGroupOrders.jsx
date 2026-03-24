import { useEffect, useState } from "react";

const AdminGroupOrders = () => {
  const [groups, setGroups] = useState([]);

  const fetchGroups = () => {
    fetch("http://localhost:5000/api/group-orders")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setGroups(data);
        } else {
          setGroups([]);
        }
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  const handleStatusChange = async (id, newStatus, currentGroup) => {
    try {
      const response = await fetch(`http://localhost:5000/api/group-orders/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: newStatus,
          paymentStatus: currentGroup.paymentStatus,
          paymentMethod: currentGroup.paymentMethod,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        fetchGroups();
      } else {
        alert(data.message || "Failed to update group order");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this group order?");
    if (!confirmed) return;

    try {
      const response = await fetch(`http://localhost:5000/api/group-orders/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (response.ok) {
        fetchGroups();
      } else {
        alert(data.message || "Failed to delete group order");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="rounded-2xl bg-white p-6 shadow">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">
        Admin Group Orders
      </h1>

      {groups.length === 0 ? (
        <p className="text-gray-500">No group orders found</p>
      ) : (
        <div className="space-y-4">
          {groups.map((group) => (
            <div key={group._id} className="rounded-xl border p-4 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-800">
                {group.title}
              </h2>

              <p className="text-sm text-gray-600">
                Group Code: {group.groupCode}
              </p>
              <p className="text-sm text-gray-600">
                Created By: {group.createdBy}
              </p>
              <p className="text-sm text-gray-600">
                Members: {group.members?.map((m) => m.name).join(", ")}
              </p>

              <div className="mt-3 space-y-1">
                {group.items?.map((item) => (
                  <p key={item._id} className="text-gray-700">
                    {item.name} × {item.qty} — {item.addedBy}
                  </p>
                ))}
              </div>

              <div className="mt-3 space-y-1">
                <p className="font-bold text-red-700">
                  Final Total: Rs. {group.finalTotal || 0}
                </p>
                <p className="text-sm text-gray-600">
                  Payment Method: {group.paymentMethod || "N/A"}
                </p>
                <p className="text-sm text-gray-600">
                  Payment Status: {group.paymentStatus || "Pending"}
                </p>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <select
                  value={group.status}
                  onChange={(e) => handleStatusChange(group._id, e.target.value, group)}
                  className="rounded border px-3 py-2"
                >
                  <option value="Open">Open</option>
                  <option value="Closed">Closed</option>
                  <option value="Completed">Completed</option>
                </select>

                <button
                  onClick={() => handleDelete(group._id)}
                  className="rounded bg-red-600 px-4 py-2 font-bold text-white hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminGroupOrders;