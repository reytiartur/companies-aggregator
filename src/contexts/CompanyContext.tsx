import { createContext, FC, useEffect, useState } from "react";
import { CompaniesContextType, CompaniesProviderProps, Company } from "../utils/types";


const CompaniesContext = createContext<CompaniesContextType>({
  companies: [],
  setCompanies: () => {},
});

const CompaniesProvider: FC<CompaniesProviderProps> = ({ children }) => {
  const [companies, setCompanies] = useState<Company[]>([]);

  useEffect(() => {
    localStorage.setItem('companies', JSON.stringify(companies));
  }, [companies]);

  return (
    <div>
        <CompaniesContext.Provider value={{companies, setCompanies}}>
            {children}
        </CompaniesContext.Provider>
    </div>
  )
};

export { CompaniesContext, CompaniesProvider };