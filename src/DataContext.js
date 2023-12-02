import React, { createContext, useContext, useState } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [eventData, setEventData] = useState({
    datetime: "",
    description: "",
    event: "",
    location: "",
    id: "",
  });

  const [reportData, setReportData] = useState([]);

  const getAllData = () => {
    return {
      eventData,
      reportData,
    };
  };

  const getReportData = () => {
    return reportData;
  };

  const value = {
    eventData,
    setEventData,
    reportData,
    setReportData,
    getAllData,
    getReportData,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
