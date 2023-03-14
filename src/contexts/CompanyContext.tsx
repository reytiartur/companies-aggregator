import { createContext, FC, useEffect, useState } from "react";
import { CompaniesContextType, CompaniesProviderProps, Company, CompanyProps } from "../utils/types";


const CompaniesContext = createContext<CompaniesContextType>({
  companiesList: [],
  setCompaniesList: () => {},
  companies: [],
  setCompanies: () => {},
  savedCompanies: [],
  setSavedCompanies: () => {},
});

const CompaniesProvider: FC<CompaniesProviderProps> = ({ children }) => {
  const [companiesList, setCompaniesList] = useState<CompanyProps[]>([])
  const [companies, setCompanies] = useState<CompanyProps[]>([])
  const [savedCompanies, setSavedCompanies] = useState<Company[]>([]);

  useEffect(() => {
    const storedCompanies = localStorage.getItem('companies');
    if (storedCompanies) {
      setSavedCompanies(JSON.parse(storedCompanies));
    }
  }, []);

  useEffect(() => {
    if(savedCompanies.length > 0)
      localStorage.setItem('companies', JSON.stringify(savedCompanies));
  }, [savedCompanies]);

  return (
    <CompaniesContext.Provider value={{companiesList, setCompaniesList, companies, setCompanies, savedCompanies, setSavedCompanies}}>
        {children}
    </CompaniesContext.Provider>
  )
};

export { CompaniesContext, CompaniesProvider };