import useLocalStorage from "@/hooks/useLocalStorage";
import { createContext, ReactNode, useContext } from "react";

interface UsersProviderProps {
  children: ReactNode;
}

interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface DBContextType {
  db: User[];
  setDB: React.Dispatch<React.SetStateAction<User[]>>;
}

const DBContext = createContext<DBContextType>({
  db: [{ firstName: "", lastName: "", email: "", password: "" }],
  setDB: () => {
    /* */
  },
});

const UsersProvider = ({ children }: UsersProviderProps) => {
  const [db, setDB] = useLocalStorage("database", [{ firstName: "", lastName: "", email: "", password: "" }]);

  return <DBContext.Provider value={{ db, setDB }}>{children}</DBContext.Provider>;
};

export function useDB() {
  const { db, setDB } = useContext(DBContext);
  return { db, setDB };
}

export default UsersProvider;
