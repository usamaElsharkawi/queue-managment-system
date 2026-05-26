import { useState } from "react";
import { useQueue } from "../context/QueueContext";

export default function AddCutomerForm() {
  const { addCustomer } = useQueue();
  const [name, setName] = useState("");
  const [service, setService] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !service) {
      alert("Please fill in both the customer name and service type.");
      return;
    }
    addCustomer(name.trim(), service);
    setName("");
    setService("");
  };

  return (
    <div className="bg-surface-card rounded-lg p-8 w-full max-w-md h-fit">
      <h2 className="text-left text-2xl font-semibold text-primary mb-5">Add To Queue</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 py-4">
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Customer Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-surface-input p-3 rounded-lg border border-stone-500 focus:outline-none text-white placeholder-text-muted"
        />
        <select
          value={service}
          onChange={(e) => setService(e.target.value)}
          className="p-3 rounded-lg border border-stone-500 focus:outline-none bg-surface-input text-white"
        >
          <option value="" disabled>Select Service</option>
          <option value="consultation">Consultation</option>
          <option value="payment">Payment</option>
          <option value="support">Support</option>
        </select>
        <button
          type="submit"
          className="bg-primary text-white py-2 rounded-lg font-medium hover:opacity-90 cursor-pointer transition-opacity"
        >
          Add Customer
        </button>
      </form>
    </div>
  );
}
