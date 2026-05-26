import { useQueue } from "../context/QueueContext";
import { FiUserCheck, FiUserX, FiPlay } from "react-icons/fi";

export default function CustomersList() {
  const { queue, serveCustomer, completeCustomer, removeCustomer } = useQueue();

  // Switch statement to determine the text and badge color for status
  const getStatusStyle = (status) => {
    switch (status) {
      case "serving":
        return "text-success font-medium";
      case "waiting":
        return "text-warning font-medium";
      default:
        return "text-text-muted";
    }
  };

  return (
    <div className="bg-surface-card rounded-lg p-8 flex-1 h-fit">
      <h2 className="text-left text-2xl font-semibold text-white mb-5">Current Queue</h2>

      {queue.length === 0 ? (
        <p className="text-text-muted text-center py-8">The queue is currently empty.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {queue.map((customer) => (
            <div
              key={customer.id}
              className="bg-black/20 p-5 rounded-lg flex items-center justify-between border border-stone-800 hover:border-stone-700 transition-colors"
            >
              <div>
                <h3 className="text-xl font-bold text-white tracking-wide">{customer.name}</h3>
                <p className="text-sm text-text-muted mt-1">
                  Service: <span className="capitalize">{customer.service}</span>
                </p>
                <p className={`text-sm mt-2 capitalize ${getStatusStyle(customer.status)}`}>
                  {customer.status}
                </p>
              </div>

              <div className="flex items-center gap-3">
                {customer.status === "waiting" ? (
                  <button
                    onClick={() => serveCustomer(customer.id)}
                    className="bg-success text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 flex items-center gap-2 cursor-pointer transition-opacity text-sm"
                  >
                    <FiPlay className="w-4 h-4" />
                    Serve
                  </button>
                ) : (
                  <button
                    onClick={() => completeCustomer(customer.id)}
                    className="bg-info text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 flex items-center gap-2 cursor-pointer transition-opacity text-sm"
                  >
                    <FiUserCheck className="w-4 h-4" />
                    Complete
                  </button>
                )}

                <button
                  onClick={() => removeCustomer(customer.id)}
                  className="bg-danger text-white p-2.5 rounded-lg hover:opacity-90 flex items-center justify-center cursor-pointer transition-opacity"
                  title="Remove from queue"
                >
                  <FiUserX className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}