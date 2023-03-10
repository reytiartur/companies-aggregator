import axios from "axios";
import { useEffect, useState } from 'react';
import { CompanyComponent } from '../components/CompanyComponent';
import { CompanyProps } from '../utils/types';
import { CircularProgress } from '@mui/material';

const requestCompanies = async () => {
  try {
        const resp = await axios.get('https://companies-api-6dd16.web.app/companies')
        return resp.data;
    } catch (err) {
        console.error(err);
    }
};

const CompaniesContainer = () => {
    const [state, setState] = useState<CompanyProps[]>([])
    const [loading, setLoading] = useState(false)
  
    useEffect(() => {
        const fetchData = async () => {
            const data = await requestCompanies();
            setState(data)
        };
        setLoading(state => !state)
        fetchData();
        setLoading(state => !state)
    }, [])

  return (
    <div className="p-4 h-full flex flex-col gap-6 pt-3 pb-40 md:grid md:grid-cols-4 md:gap-4 md:auto-rows-max bg-background overflow-y-auto">
        {loading ? (
                <CircularProgress color='success' size='100' thickness={10} variant='indeterminate' />
            ) : state?.slice(0, 12).map(company => (
                <CompanyComponent key={company.name} {...company} />
            ))
        }
  </div>
  )
}

export default CompaniesContainer