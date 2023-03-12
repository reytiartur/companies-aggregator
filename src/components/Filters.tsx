import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BusinessIcon from '@mui/icons-material/Business';
import { useContext } from 'react';
import { DeleteFns } from '../utils/types';
import CustomAutocomplete from './CustomAutocomplete';
import CustomChip from "./CustomChip";
import { FiltersContext } from "../contexts/FiltersContext";



const locations = ['Warszawa', 'Kraków', 'Wrocław', 'Gdańsk', 'Poznań', 'Gdynia', 'Łódź', 'Rzeszów', 'Katowice', 'Szczecin', 'Gliwice', 'Bielsko-Biała', 'Łomża', 'Białystok' ]
const technologies = ['React', 'HTML', 'CSS', 'JavaScript', 'TypeScript', 'Python', 'C', 'C#', 'C++', 'PHP', 'GO', 'Vue', 'React Native', 'Angular', 'Swift', 'Node', 'Java', 'Kotlin', 'Flutter', '.Net', 'Next', 'Nuxt']
const types = ['Corporation', 'Software House', 'Startup', 'E-Commerce', 'Other']

  

const Filters = () => {
  const { selected, deleteFns } = useContext(FiltersContext)
  const deleteRefFns: DeleteFns = {locations: {}, technologies: {}, type: {}}


  return (
    <div className="flex items-center h-16 bg-white border-b border-inactive px-8 gap-4">
        <div className="basis-[10%] grow-0 shrink-1">
            <CustomAutocomplete
              placeholder="Locations"
              type='locations'
              id="location-search"
              options={locations}
              deleteRefFns={deleteRefFns}
            />
        </div>

        <div className="basis-[10%] grow-0 shrink-1">
            <CustomAutocomplete
              placeholder='Technologies'
              type='technologies'
              id="tech-search"
              options={technologies}
              deleteRefFns={deleteRefFns}
            />
        </div>

        <div className="basis-[10%] grow-0 shrink-1">
            <CustomAutocomplete
              placeholder='Company Type'
              type='type'
              id="type-search"
              options={types}
              deleteRefFns={deleteRefFns}
            />
        </div>

        <div className="basis-2/6 grow flex px-1 overflow-auto gap-1 items-center scrollbar-hide relative">
          <div className='w-1 z-10 h-full absolute top-0 left-0 bg-gradient-to-r from-white' />
          {Object.entries(selected).map(([key, values]) => (
            values.flat().map((value: string) => (
              <CustomChip key={`${key}-${value}`} type={key} deleteFns={deleteFns} value={value} />
            ))
          ))}
          <div className='w-2 z-10 h-full absolute top-0 right-0 bg-gradient-to-l from-white' />
        </div>

        <div className="basis-1/6 flex items-center gap-4 justify-end">
            <div className="w-10 h-10 flex flex-col justify-center items-center">
                <BusinessIcon fontSize='large' className='text-secondary' />
            </div>
            <div className="w-10 h-10 flex flex-col justify-center items-center">
                <MarkEmailReadIcon fontSize='large' className='text-secondary' />
            </div>
            <div className="w-10 h-10 flex flex-col justify-center items-center">
                <BookmarkIcon fontSize='large' className='text-secondary' />
            </div>
        </div>
    </div>
  )
}

export default Filters