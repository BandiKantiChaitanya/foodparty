import { createContext, useState,useContext } from "react";

const DishContext=createContext()

export const  DishContextProvider=({children})=>{
    const [counts, setCounts] = useState({});

  const handleIncrement = (id) => {
    setCounts((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const handleDecrement = (id) => {
    setCounts((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 0) - 1, 0),
    }));
  };

  const totalCount = Object.values(counts).reduce((sum, val) => sum + val, 0);
  return (
    <DishContext.Provider value={{counts,setCounts,handleIncrement,handleDecrement,totalCount}} >
        {children}
    </DishContext.Provider>
  )
}

export const useDishContext = () => useContext(DishContext);