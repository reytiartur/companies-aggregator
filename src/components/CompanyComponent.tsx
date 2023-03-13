import Card from '@mui/material/Card';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LanguageIcon from '@mui/icons-material/Language';
import { useContext } from 'react';
import { CompaniesContext } from '../contexts/CompanyContext';
import { CompanyProps } from '../utils/types';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';


export const CompanyComponent = ({ name, description, linkedin, locations, logoUrl, technologies, type, website }: CompanyProps) => {
    const color = type.toLowerCase() === 'corporation' ? 'fuchsia-400' : type.toLowerCase() === 'software house' ? 'cyan-500' : type.toLowerCase() === 'startup' ? 'orange-400' : 'rose-400'
    const {companies, setCompanies} = useContext(CompaniesContext)
    let company = companies.find(obj => obj.name === name)

    const handleSent = () => {
        if(company) {
            const index = companies.indexOf(company)
            setCompanies([...companies.slice(0, index), {...company, sent: true, sentDate: new Date()}, ...companies.slice(index + 1)])
        } else {
            setCompanies([...companies, {name, sent: true, later:false, sentDate: new Date()}])
        }
    }

    const handleToggle = () => {
        if(company) {
            const index = companies.indexOf(company)
            setCompanies([...companies.slice(0, index), {...company, later: !company.later}, ...companies.slice(index + 1)])
        } else {
            setCompanies([...companies, {name, sent: false, later:true}])
        }
    }

    return (
        <Card sx={{ display: 'flex', flexDirection: 'column', paddingY: '16px', borderRadius: '8px', border: company?.sent ? '2px solid #81b5a2' : '2px solid white', opacity: company?.sent ? '0.85' : '1' }} variant="outlined">
            <div className="flex gap-5 px-4">
                <div className="rounded-xl p-1 border border-zinc-300 self-start">
                    <div className="rounded-xl w-24 h-24" style={{backgroundImage: `url(${logoUrl})`, backgroundPosition: 'center', backgroundSize: 'contain', backgroundRepeat: 'no-repeat'}} />
                </div>
                
                <div className="flex flex-col gap-2 relative cursor-pointer w-full">
                    <p className='text-lg text-secondary font-bold whitespace-nowrap overflow-hidden'>{name.length > 14 ? `${name.slice(0, 13)}...` : name}</p>
                    <div className="basis-8 shrink-0 absolute top-0 right-0" onClick={handleToggle}>
                        {company?.later ? <BookmarkIcon className='text-secondary' /> : <BookmarkBorderIcon className='text-secondary' />}
                    </div>
                    <p className={`px-2 rounded-xl w-max text-${color} border border-${color} font-medium text-xs`}>{type}</p>
                    <div className="flex gap-2">
                        <a className="hover:text-gray-500 transition duration-300 ease-in-out" target="_blank" href={linkedin}>
                            <LinkedInIcon />
                        </a>
                        <a className="hover:text-gray-500 transition duration-300 ease-in-out" target="_blank" href={website}>
                            <LanguageIcon />
                        </a>
                    </div>
                </div>
            </div>
            <div className='flex gap-1 mt-3 flex-nowrap overflow-hidden items-start mx-4 max-h-5'>
                {locations.slice(0, 3).map(city => (
                    <p key={city} className='whitespace-nowrap text-sm'>{city} |</p>  
                ))}
                {locations.length > 3 ? (<p className='font-medium text-sm'>+ {locations.length - 3}</p>) : null}
            </div>
            <p className='font-semibold mt-2 text-sm px-4'>Tech Stack:</p>
            <nav className='relative flex flex-col'>
                <div className='w-6 z-10 h-full absolute top-0 left-0 bg-gradient-to-r from-white' />
                <div className='flex w-full overflow-x-scroll overflow-y-hidden items-center space-x-4 py-1 px-4 whitespace-nowrap scrollbar-hide'>
                    {technologies.map((technology, index) => (
                        <p key={technology + index} className='uppercase text-sm text-secondary font-medium'>{technology}</p>
                    ))}
                </div>
                <div className='w-8 z-10 h-full absolute top-0 right-0 bg-gradient-to-l from-white' />
            </nav>
            <div className="pt-1 px-4 mb-3 flex flex-col min-h-[96px]">
                <p className='text-sm font-light text-zinc-500 line-clamp-3'>{description}</p>
                <button className='border-0 h-8 mt-auto text-sm text-primary hover:text-hover font-medium underline self-start'>Read more</button>
            </div>
            <div className="border-t border-gray-400 flex flex-col px-4 pt-2 grow justify-end h-[73px]">
                {company?.sent ? (
                    <>
                        <p className='self-start text-zinc-500 mb-1 text-xs'>Sent: {new Date(company?.sentDate ?? '').toLocaleDateString()}</p>
                        <button onClick={handleSent} className='cursor-pointer border-2 px-2 h-11 font-semibold text-sm items-center gap-1 rounded-xl flex justify-center text-secondary bg-white border-secondary hover:border-hover hover:text-hover hover:bg-zinc-50 opacity-100 transition duration-300'>Sent again</button>
                    </>
                ) : (
                    <button onClick={handleSent} className='cursor-pointer border px-2 mt-15 h-11 font-semibold text-sm items-center gap-1 rounded-xl flex justify-center text-white bg-primary border-primary hover:bg-hover transition duration-300'>Mark as sent</button>
                )}
            </div>
        </Card>
    )
}

export default CompanyComponent