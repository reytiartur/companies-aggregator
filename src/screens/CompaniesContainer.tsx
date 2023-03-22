import axios from "axios";
import { useContext, useEffect, useState, lazy, Suspense, useRef } from 'react';
import { CompanyProps } from '../utils/types';
import { FiltersContext } from "../contexts/FiltersContext";
import { CompaniesContext } from "../contexts/CompanyContext";
import InfiniteScroll from 'react-infinite-scroll-component';
import LoadingCompanyComponent from "../components/LoadingCompanyComponent";
import Loader from "../components/Loader";

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
    const { selected, selectedCat, search } = useContext(FiltersContext)
    const [ hasMore, setHasMore ] = useState(false)
    const countRef = useRef(0)

    const fetchData = async () => {
        const data = await requestCompanies();
        setCompaniesList(data)
        setCompanies([...data.slice(0, 12)])
        countRef.current = data.length
        setHasMore(true)
    };

    const loadFunc = () => {
        if(selectedCat === 'all') {
            const nextCompanies = companiesList.slice(companies.length, companies.length + 12)
            setCompanies([...companies, ...nextCompanies])
            setHasMore(companies.length < countRef.current)
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
            countRef.current = filteredCompanies.length
        } else {
            if(selectedCat === 'sent') {
                const categorizedArray = companiesList.filter(company => {
                  const matching = savedCompanies.find(savedCompany => company.name === savedCompany.name)
                  return matching && matching.sent
                })
                setCompanies(categorizedArray)
                countRef.current = categorizedArray.length
            } else if(selectedCat === 'later') {
                const categorizedArray = companiesList.filter(company => {
                    const matching = savedCompanies.find(savedCompany => company.name === savedCompany.name)
                    return matching && matching.later
                })
                setCompanies(categorizedArray)
                countRef.current = categorizedArray.length
            } else {
                setCompanies([...companiesList?.slice(0, 12)])
                countRef.current = companiesList.length
            }
        }
    }, [selected, selectedCat])

  return (
    <InfiniteScroll
        dataLength={companies.length}
        next={loadFunc}
        hasMore={hasMore}
        loader={!search ? <Loader /> : <div className="col-span-full text-center pt-40 text-2xl text-secondary font-semibold">There is no company with matching name.</div>}
        className='p-4 min-h-screen grid grid-cols-1 gap-6 pt-3 pb-6 sm:grid sm:grid-cols-2 sm:auto-rows-max md:p-6 md:pt-3 lg:grid-cols-3 lg:gap-4 xl:gap-6 2xl:grid-cols-4 bg-background overflow-y-scroll'
    >
        {!search ? 
            companies?.map(company => (
                <Suspense key={`suspense ${company.name}`} fallback={<LoadingCompanyComponent />}>
                    <CompanyComponent key={company.name} {...company} />
                </Suspense>
        )) :
            companiesList?.filter(company => company.name.toLowerCase().includes(search.toLowerCase())).map(company => (
                <Suspense key={`suspense ${company.name}`} fallback={<LoadingCompanyComponent />}>
                    <CompanyComponent key={company.name} {...company} />
                </Suspense>
            ))
        }
    </InfiniteScroll>
  )
}

export default CompaniesContainer