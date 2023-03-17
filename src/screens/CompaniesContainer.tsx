import axios from "axios";
import { useContext, useEffect, useState } from 'react';
import { CompanyComponent } from '../components/CompanyComponent';
import { CompanyProps } from '../utils/types';
import { CircularProgress } from '@mui/material';
import { FiltersContext } from "../contexts/FiltersContext";
import { CompaniesContext } from "../contexts/CompanyContext";

const requestCompanies = async () => {
  try {
        const resp = await axios.get('https://companies-api-6dd16.web.app/companies')
        return resp.data;
    } catch (err) {
        console.error(err);
    }
};

const CompaniesContainer = () => {
    const { companiesList, setCompaniesList, companies, setCompanies, savedCompanies } = useContext(CompaniesContext)
    const [loading, setLoading] = useState(false)
    const { selected, selectedCat } = useContext(FiltersContext)

    const fetchData = async () => {
        const data = await requestCompanies();
        setCompaniesList(data)
        setCompanies(data)
    };

    const loadWhileFetch = () => {
        setLoading(state => !state)
        fetchData();
        setLoading(state => !state)
    }

    useEffect(() => {
        loadWhileFetch()
    }, [])

    useEffect(() => {
        if(Object.values(selected).some((arr) => arr.length > 0)) {
            let companiesArray:CompanyProps[] = []
            if(selectedCat === 'all') {
                companiesArray = [...companiesList]
            } else if(selectedCat === 'sent') {
                const categorizedArray = companiesList.filter(company => {
                  const matching = savedCompanies.find(savedCompany => company.name === savedCompany.name)
                  return matching && matching.sent
                })
                companiesArray = [...categorizedArray]
            } else if(selectedCat === 'later') {
                const categorizedArray = companiesList.filter(company => {
                    const matching = savedCompanies.find(savedCompany => company.name === savedCompany.name)
                    return matching && matching.later
                })
                companiesArray = [...categorizedArray]
            }

            const filteredCompanies = companiesArray.filter(company => {
                const locIncluded = selected.locations.length ? company.locations.some(location => selected.locations.includes(location)) : true;
                const techIncluded = selected.technologies.length ? company.technologies.some(tech => selected.technologies.includes(tech)) : true;
                const typeIncluded = selected.type.length ? selected.type.includes(company.type) : true;
                return locIncluded && techIncluded && typeIncluded;
            })
            setCompanies(filteredCompanies)
        } else {
            if(selectedCat === 'sent') {
                const categorizedArray = companiesList.filter(company => {
                  const matching = savedCompanies.find(savedCompany => company.name === savedCompany.name)
                  return matching && matching.sent
                })
                setCompanies(categorizedArray)
            } else if(selectedCat === 'later') {
                const categorizedArray = companiesList.filter(company => {
                    const matching = savedCompanies.find(savedCompany => company.name === savedCompany.name)
                    return matching && matching.later
                })
                setCompanies(categorizedArray)
            } else {
                setCompanies(companiesList)
            }
        }
    }, [selected, selectedCat])

  return (
    <div className="p-4 h-full grid grid-cols-1 gap-6 pt-3 pb-40 sm:grid sm:grid-cols-2 sm:auto-rows-max md:p-6 md:pt-3 md:pb-40 lg:grid-cols-3 lg:gap-4 xl:gap-6 2xl:grid-cols-4 bg-background overflow-y-auto">
        {loading ? (
                <CircularProgress color='success' size='100' thickness={10} variant='indeterminate' />
            ) : companies?.slice(0, 12).map(company => (
                <CompanyComponent key={company.name} {...company} />
            ))
        }
    </div>
  )
}

export default CompaniesContainer