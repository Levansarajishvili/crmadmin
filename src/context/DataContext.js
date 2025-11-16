import { createContext, useContext, useEffect, useState } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(false);

  // Initial data load
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [ordersRes, customersRes, inventoryRes] = await Promise.all([
      ]);
      setOrders(ordersRes.products || []);
      setCustomers(customersRes.users || []);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  const addOrder = (newOrder) => {
    setOrders([...orders, newOrder]);
  };

  const addCustomer = (newCustomer) => {
    setCustomers([...customers, newCustomer]);
  };

  const value = {
    orders,
    customers,
    inventory,
    loading,
    addOrder,
    addCustomer,
    loadData,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within DataProvider");
  }
  return context;
};