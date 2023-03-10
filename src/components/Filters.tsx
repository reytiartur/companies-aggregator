import { getCitiesByCountryCode } from "country-city-location";
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BusinessIcon from '@mui/icons-material/Business';
import { useEffect, useState } from 'react';
import { CityProps, DeleteFns, SelectedProps } from '../utils/types';
import CustomAutocomplete from './CustomAutocomplete';
import CustomChip from "./CustomChip";



const locations = getCitiesByCountryCode('PL').map((city: CityProps) => city.name)
const technologies = ['React', 'HTML', 'CSS', 'JavaScript', 'TypeScript', 'Python', 'C', 'C#', 'C++', 'PHP', 'GO', 'Vue', 'React Native', 'Angular', 'Swift', 'Node', 'Java', 'Kotlin', 'Flutter', '.Net', 'Next', 'Nuxt']
const types = ['Corporation', 'Software House', 'Startup', 'E-Commerce', 'Other']

  

const Filters = () => {
  const [selected, setSelected] = useState<SelectedProps>({locations: [], technologies: [], type: []})
  const [deleteFns, setDeleteFns] = useState<DeleteFns>({locations: {}, technologies: {}, type: {}})

  const deleteRefFns: DeleteFns = {locations: {}, technologies: {}, type: {}}


  return (
    <div className="flex items-center h-16 bg-white border-b border-inactive px-8 gap-4">
        <div className="basis-[10%] grow-0 shrink-1">
            <CustomAutocomplete
              placeholder="Locations"
              type='locations'
              id="location-search"
              options={locations}
              selected={selected}
              setSelected={setSelected}
              deleteFns={deleteFns}
              setDeleteFns={setDeleteFns}
              deleteRefFns={deleteRefFns}
            />
        </div>

        <div className="basis-[10%] grow-0 shrink-1">
            <CustomAutocomplete
              placeholder='Technologies'
              type='technologies'
              id="tech-search"
              options={technologies}
              selected={selected}
              setSelected={setSelected}
              deleteFns={deleteFns}
              setDeleteFns={setDeleteFns}
              deleteRefFns={deleteRefFns}
            />
        </div>

        <div className="basis-[10%] grow-0 shrink-1">
            <CustomAutocomplete
              placeholder='Company Type'
              type='type'
              id="type-search"
              options={types}
              selected={selected}
              setSelected={setSelected}
              deleteFns={deleteFns}
              setDeleteFns={setDeleteFns}
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