import { createContext, FC, useEffect, useState } from "react";
import { CompaniesContextType, CompaniesProviderProps, Company } from "../utils/types";


const CompaniesContext = createContext<CompaniesContextType>({
  companies: [],
  setCompanies: () => {},
});

const CompaniesProvider: FC<CompaniesProviderProps> = ({ children }) => {
  const [companies, setCompanies] = useState<Company[]>([]);

  useEffect(() => {
    const storedCompanies = localStorage.getItem('companies');
    if (storedCompanies) {
      setCompanies(JSON.parse(storedCompanies));
    }
  }, []);

  useEffect(() => {
    if(companies.length > 0)
      localStorage.setItem('companies', JSON.stringify(companies));
  }, [companies]);

  return (
    <CompaniesContext.Provider value={{companies, setCompanies}}>
        {children}
    </CompaniesContext.Provider>
  )
};

export { CompaniesContext, CompaniesProvider };