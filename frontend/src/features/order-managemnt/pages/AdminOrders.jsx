import { useEffect, useState } from "react";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  // fetch orders
  const fetchOrders = () => {
    fetch("http://localhost:5000/api/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // update status
  const handleStatusChange = async (id, newStatus) => {
    try {
      await fetch(`http://localhost:5000/api/orders/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderStatus: newStatus }),
      });

      fetchOrders(); // refresh
    } catch (error) {
      console.error(error);
    }
  };

  // delete order
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/orders/${id}`, {
        method: "DELETE",
      });

      fetchOrders(); // refresh
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="rounded-2xl bg-white p-6 shadow">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">
        Admin Order Management
      </h1>

      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="rounded-xl border p-4 shadow-sm"
            >
              <h2 className="text-lg font-semibold">
                {order.customer.fullName}
              </h2>

              <p className="text-sm text-gray-600">
                {order.customer.phone}
              </p>
              <p className="text-sm text-gray-600">
                {order.customer.address}
              </p>

              <div className="mt-3 space-y-1">
                {order.items.map((item) => (
                  <p key={item._id}>
                    {item.name} × {item.qty}
                  </p>
                ))}
              </div>

              <p className="mt-2 font-bold text-red-700">
                Total: Rs. {order.total}
              </p>

              {/* STATUS UPDATE */}
              <div className="mt-3 flex items-center gap-3">
                <select
                  value={order.orderStatus}
                  onChange={(e) =>
                    handleStatusChange(order._id, e.target.value)
                  }
                  className="rounded border px-2 py-1"
                >
                  <option>Pending</option>
                  <option>Confirmed</option>
                  <option>Preparing</option>
                  <option>Out for Delivery</option>
                  <option>Delivered</option>
                </select>

                <button
                  onClick={() => handleDelete(order._id)}
                  className="rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700"
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

export default AdminOrders;