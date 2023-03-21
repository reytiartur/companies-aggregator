import SearchIcon from '@mui/icons-material/Search';
import { useContext } from 'react';
import { FiltersContext } from '../contexts/FiltersContext';

const Search = () => {
    const { search, setSearch} = useContext(FiltersContext)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        setSearch(value)
    }

  return (
    <div className='relative bg-inactive h-10 w-32 md:w-auto rounded-xl overflow-hidden'>
        <div className="absolute left-2 top-0 bottom-0 flex items-center justify-center">
            <SearchIcon className='text-zinc-300 text-xl pointer-events-none' />
        </div>
        <input type="text" name="search" id="search" placeholder='Search...' value={search} onChange={(e) => handleChange(e)} className='w-full h-full bg-transparent pl-9 text-zinc-300 placeholder:text-zinc-300 outline-none rounded-xl border-2 border-inactive focus:border-white' />
    </div>
  )
}

export default Search