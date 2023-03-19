import axios from "axios";
import { useContext, useEffect, useState, lazy, Suspense } from 'react';
import { CompanyProps } from '../utils/types';
import { FiltersContext } from "../contexts/FiltersContext";
import { CompaniesContext } from "../contexts/CompanyContext";
import InfiniteScroll from 'react-infinite-scroll-component';

const CompanyComponent = lazy(() => import('../components/CompanyComponent')) 

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
    const { selected, selectedCat } = useContext(FiltersContext)
    const [ hasMore, setHasMore ] = useState(true) 

    const fetchData = async () => {
        const data = await requestCompanies();
        setCompaniesList(data)
        setCompanies([...data.slice(0, 12)])
    };

    const loadFunc = () => {
        if(selectedCat === 'all') {
            const nextCompanies = companiesList.slice(companies.length, companies.length + 12)
            setCompanies([...companies, ...nextCompanies])
            setHasMore(companies.length < companiesList.length)
        } else {
            setHasMore(false)
        }
    }

    useEffect(() => {
        fetchData()
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
                setCompanies([...companiesList?.slice(0, 12)])
            }
        }
    }, [selected, selectedCat])

  return (
    <InfiniteScroll
        dataLength={companies.length}
        next={loadFunc}
        hasMore={hasMore}
        loader={<div className="h-screen col-span-full flex justify-center items-center" key={'loader'}>Loading...</div>}
        className='p-4 min-h-screen grid grid-cols-1 gap-6 pt-3 pb-6 sm:grid sm:grid-cols-2 sm:auto-rows-max md:p-6 md:pt-3 lg:grid-cols-3 lg:gap-4 xl:gap-6 2xl:grid-cols-4 bg-background overflow-y-scroll'
    >
        {companies?.map(company => (
            <Suspense key={`suspense ${company.name}`} fallback={<div >isLoading...</div>}>
                <CompanyComponent key={company.name} {...company} />
            </Suspense>
        ))}
    </InfiniteScroll>
  )
}

export default CompaniesContainer