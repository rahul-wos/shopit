import React, { ReactNode, useEffect, useState } from "react";
import { createContext } from "react";

interface UsersProviderProps {
  children: ReactNode;
}

const dbName = "database";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface DBContextType {
  lsData: [];
  setDB: React.Dispatch<React.SetStateAction<[]>>;
}

export const DBContext = createContext<DBContextType>({
  lsData: [],
  setDB: () => {
    /* */
  },
});

export const UsersProvider = ({ children }: UsersProviderProps) => {
  const [db, setDB] = useState([]);

  useEffect(() => {
    localStorage.setItem(dbName, JSON.stringify(db));
    console.log(db);
  }, [db]);

  const lsData = JSON.parse(localStorage.getItem(dbName) || "");

  return <DBContext.Provider value={{ lsData, setDB }}>{children}</DBContext.Provider>;
};

export default { UsersProvider };

// function getDB() {
//   try {
//     const tempData = localStorage.getItem(dbName);
//     return JSON.parse(tempData || "");
//   } catch (e) {
//     console.log("ERROR: ", e);
//   }
// }

// function setDB() {
//   db.push(data);
//   setDb(db);
// }
