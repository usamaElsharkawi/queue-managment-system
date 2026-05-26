import { createContext, useContext, useState } from "react";

const QueueContext = createContext(null);

export function QueueProvider({ children }) {
  const [queue, setQueue] = useState([])

  const addCustomer = (name, service) => {
    const newCustomer = {
      id: Date.now().toString(),
      name,
      service,
      status: "waiting",
    };
    setQueue((prevQueue) => [...prevQueue, newCustomer]);
  };

  const serveCustomer = (id) => {
    setQueue((prevQueue) =>
      prevQueue.map((customer) =>
        customer.id === id ? { ...customer, status: "serving" } : customer
      )
    );
  };

  const completeCustomer = (id) => {
    setQueue((prevQueue) => prevQueue.filter((customer) => customer.id !== id));
  };

  const removeCustomer = (id) => {
    setQueue((prevQueue) => prevQueue.filter((customer) => customer.id !== id));
  };

  return (
    <QueueContext.Provider
      value={{
        queue,
        addCustomer,
        serveCustomer,
        completeCustomer,
        removeCustomer,
      }}
    >
      {children}
    </QueueContext.Provider>
  );
}

export function useQueue() {
  const context = useContext(QueueContext);
  if (!context) {
    throw new Error("useQueue must be used within a QueueProvider");
  }
  return context;
}
